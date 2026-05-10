import type { Core } from '@strapi/strapi';

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
  upload: {
    config: {
      provider: 'strapi-provider-upload-azure-storage-v5',
      providerOptions: {
        account: env('AZURE_STORAGE_ACCOUNT'),
        accountKey: env('AZURE_STORAGE_ACCOUNT_KEY'),
        containerName: env('AZURE_STORAGE_CONTAINER', 'cms-uploads'),
        defaultPath: env('AZURE_STORAGE_DEFAULT_PATH', 'uploads'),
        serviceBaseURL: env(
          'AZURE_STORAGE_URL',
          `https://${env('AZURE_STORAGE_ACCOUNT')}.blob.core.windows.net`,
        ),
        sizeLimit: 10 * 1024 * 1024,
      },
    },
  },
});

export default config;
