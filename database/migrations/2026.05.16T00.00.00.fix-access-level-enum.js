'use strict';

/**
 * Fix: accessLevel was stored as a relation in the DEV Strapi DB instead of
 * an enumeration (varchar column). This migration:
 *  1. Drops any join tables created for the accessLevel relation
 *  2. Adds the access_level varchar column to content_items if missing
 *  3. Patches strapi_database_schema so the next boot diff resolves cleanly
 */
module.exports = {
  async up(knex) {
    // 1 — Drop any relation join tables that contain "access_level" in the name
    const joinTablesResult = await knex.raw(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename LIKE '%access_level%'
    `);
    for (const row of joinTablesResult.rows) {
      await knex.schema.dropTableIfExists(row.tablename);
    }

    // 2 — Add access_level as a plain string column (how Strapi stores enumerations)
    const hasCol = await knex.schema.hasColumn('content_items', 'access_level');
    if (!hasCol) {
      await knex.schema.alterTable('content_items', (t) => {
        t.string('access_level').defaultTo('public');
      });
      // Back-fill existing rows that have no value yet
      await knex('content_items').whereNull('access_level').update({ access_level: 'public' });
    }

    // 3 — Patch strapi_database_schema so Strapi's diff sees a clean state
    const storedRow = await knex('strapi_database_schema')
      .orderBy('time', 'desc')
      .first();

    if (storedRow) {
      const schema =
        typeof storedRow.schema === 'string'
          ? JSON.parse(storedRow.schema)
          : storedRow.schema;

      if (schema && Array.isArray(schema.tables)) {
        // Remove stale join-table entries for access_level
        schema.tables = schema.tables.filter((t) => !t.name.includes('access_level'));

        // Fix the content_items table entry
        const ciTable = schema.tables.find((t) => t.name === 'content_items');
        if (ciTable && Array.isArray(ciTable.columns)) {
          // Remove any wrong column definition
          ciTable.columns = ciTable.columns.filter((c) => !c.name.includes('access_level'));

          // Insert the correct string column definition (Strapi stores enum as string)
          ciTable.columns.push({
            name: 'access_level',
            type: 'string',
            args: [],
            defaultTo: 'public',
            notNullable: false,
            unsigned: false,
          });
        }

        await knex('strapi_database_schema')
          .where({ id: storedRow.id })
          .update({
            schema: JSON.stringify(schema),
            time: new Date(),
          });
      }
    }
  },

  async down() {
    // No rollback — type correction on a dev-only fix
  },
};
