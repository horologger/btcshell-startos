import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  hasPass: boolean
  btcAuth: {
    username: string
    password: string
  }
}

export const exposedStore = setupExposeStore<Store>(() => [])
