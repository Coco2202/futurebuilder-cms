import type { Core } from '@strapi/strapi';

const AZURE_STORAGE_ACCOUNT = process.env.AZURE_STORAGE_ACCOUNT ?? '';
const storageOrigin = AZURE_STORAGE_ACCOUNT
  ? `https://${AZURE_STORAGE_ACCOUNT}.blob.core.windows.net`
  : '';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'script-src': ["'self'", "'unsafe-inline'"],
          'media-src': ["'self'", 'blob:', 'data:', ...(storageOrigin ? [storageOrigin] : [])],
          'img-src': [
            "'self'",
            'blob:',
            'data:',
            'market-assets.strapi.io',
            ...(storageOrigin ? [storageOrigin] : []),
          ],
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: (
        process.env.FRONTEND_URL ?? 'http://localhost:3001'
      ).split(','),
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
