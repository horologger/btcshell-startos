import { setupExposeStore } from '@start9labs/start-sdk'

export type Store = {
  password: string | null
  btcAuth: {
    username: string
    password: string
  }
}

export const initStore: Store = {
  password: null,
  btcAuth: {
    username: '',
    password: '',
  },
}

export const exposedStore = setupExposeStore<Store>(() => [])
