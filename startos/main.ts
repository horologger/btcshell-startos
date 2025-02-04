import { sdk } from './sdk'
import { T } from '@start9labs/start-sdk'
import { uiPort } from './utils'

export const main = sdk.setupMain(async ({ effects, started }) => {
  /**
   * ======================== Setup (optional) ========================
   *
   * In this section, we fetch any resources or run any desired preliminary commands.
   */
  console.info('Starting BTCShell!')

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const healthReceipts: T.HealthReceipt[] = []

  /**
   * ======================== Daemons ========================
   *
   * In this section, we create one or more daemons that define the service runtime.
   *
   * Each daemon defines its own health check, which can optionally be exposed to the user.
   */
  return sdk.Daemons.of(effects, started, healthReceipts).addDaemon('primary', {
    subcontainer: { imageId: 'btcshell' },
    command: [
      '/usr/bin/gotty',
      '--port',
      '8080',
      '-c',
      'admin:Whatever1',
      '--permit-write',
      '--reconnect',
      '/bin/bash',
    ],
    env: {
      GOTTY_PORT: '8080',
      APP_USER: 'admin',
      APP_PASSWORD: '',
      BTC_RPC_HOST: '',
      BTC_RPC_PORT: '8332',
      BTC_RPC_USER: '',
      BTC_RPC_PASSWORD: '',
    },
    mounts: sdk.Mounts.of().addVolume('main', null, '/data', false),
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'Server is ready',
          errorMessage:
            'Server is experiencing an issue. Please check the logs.',
        }),
    },
    requires: [],
  })
})
