import { sdk } from './sdk'
import { uiPort } from './utils'

export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')

  const uiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })

  const ui = sdk.createInterface(effects, {
    name: 'Web User Interface',
    id: 'ui',
    description: 'Web UI for BTC Shell',
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    search: {},
  })
  const httpReceipt = await uiOrigin.export([ui])

  return [httpReceipt]
})
