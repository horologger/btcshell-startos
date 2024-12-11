import { setupExposeStore } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export type Store = {
  BTCSHELL__server__ROOT_URL: string
  BTCSHELL__security__SECRET_KEY: string
  BTCSHELL__service__DISABLE_REGISTRATION: boolean
  smtp: typeof sdk.inputSpecConstants.smtpInputSpec.validator._TYPE
}

export const exposedStore = setupExposeStore<Store>(() => [])
