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

  const store = await sdk.store.getOwn(effects, sdk.StorePath).const()

  const un = 'admin'
  const unpw = un + ':' + store.password!

  /**
   * ======================== Additional Health Checks (optional) ========================
   *
   * In this section, we define *additional* health checks beyond those included with each daemon (below).
   */
  const healthReceipts: T.HealthCheck[] = []

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
      '-c',
      unpw,
      '--permit-write',
      '--reconnect',
      '/bin/bash',
    ],
    // command: [
    //   '/usr/local/bin/docker_entrypoint.sh',
    // ],
    env: {
      GOTTY_PORT: '8080',
      APP_USER: un,
      APP_PASSWORD: store.password!,
      BITCOIN_RPCCONNECT: 'bitcoind.startos',
      BITCOIN_RPCPORT: '8332',
      BITCOIN_RPCUSER: store.btcAuth.username,
      BITCOIN_RPCPASSWORD: store.btcAuth.password,
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
