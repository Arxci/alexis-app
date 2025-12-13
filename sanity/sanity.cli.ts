import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'ghd2xkxv',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
