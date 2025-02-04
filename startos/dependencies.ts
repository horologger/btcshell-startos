import { sdk } from './sdk'

export const setDependencies = sdk.setupDependencies(async ({ effects }) => {
  return {
    bitcoind: {
      healthChecks: [],
      kind: 'running',
      versionRange: '>=28.1',
    },
  }
})
