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

  const { BTCSHELL__server__ROOT_URL, BTCSHELL__security__SECRET_KEY, smtp } =
    await sdk.store.getOwn(effects, sdk.StorePath).const()

  let smtpCredentials: T.SmtpValue | null = null

  if (smtp.selection === 'system') {
    smtpCredentials = await sdk.getSystemSmtp(effects).const()
    if (smtpCredentials && smtp.value.customFrom)
      smtpCredentials.from = smtp.value.customFrom
  } else if (smtp.selection === 'custom') {
    smtpCredentials = smtp.value
  }

  let mailer: BTCShellMailer = {
    BTCSHELL__mailer__ENABLED: 'false',
  }
  if (smtpCredentials) {
    mailer = {
      BTCSHELL__mailer__ENABLED: 'true',
      BTCSHELL__mailer__SMTP_ADDR: smtpCredentials.server,
      BTCSHELL__mailer__SMTP_PORT: String(smtpCredentials.port),
      BTCSHELL__mailer__FROM: smtpCredentials.from,
      BTCSHELL__mailer__USER: smtpCredentials.login,
    }
    if (smtpCredentials.password)
      mailer.BTCSHELL__mailer__PASSWD = smtpCredentials.password
  }

  const env: BTCShellEnv = {
    BTCSHELL__lfs__PATH: '/data/git/lfs',
    BTCSHELL__server__ROOT_URL,
    BTCSHELL__security__INSTALL_LOCK: 'true',
    BTCSHELL__security__SECRET_KEY,
    ...(mailer || {}),
  }

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
    image: { id: 'btcshell' },
    command: ['/usr/bin/entrypoint', '--', '/bin/s6-svscan', '/etc/s6'],
    env,
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

type BTCShellEnv = Partial<NonNullable<BTCShellMailer>> & {
  BTCSHELL__lfs__PATH: '/data/git/lfs'
  BTCSHELL__server__ROOT_URL: string
  BTCSHELL__security__INSTALL_LOCK: 'true'
  BTCSHELL__security__SECRET_KEY: string
}

type BTCShellMailer =
  | {
      BTCSHELL__mailer__ENABLED: 'false'
    }
  | {
      BTCSHELL__mailer__ENABLED: 'true'
      BTCSHELL__mailer__SMTP_ADDR: string
      BTCSHELL__mailer__SMTP_PORT: string
      BTCSHELL__mailer__FROM: string
      BTCSHELL__mailer__USER: string
      BTCSHELL__mailer__PASSWD?: string
    }
