'use strict';

const roleService = require('./server/services/role');

module.exports = (plugin) => {
  plugin.services.role = roleService;
  return plugin;
};
