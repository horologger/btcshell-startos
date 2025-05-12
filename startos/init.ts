import { sdk } from './sdk'
import { exposedStore, initStore } from './store'
import { setDependencies } from './dependencies'
import { setInterfaces } from './interfaces'
import { versions } from './versions'
import { actions } from './actions'
import { utils } from '@start9labs/start-sdk'
import { generateRpcUserDependent } from 'bitcoind-startos/startos/actions/generateRpcUserDependent'
import { resetPassword } from './actions/resetPassword'
import { randomPassword } from './utils'

// **** PreInstall ****
const preInstall = sdk.setupPreInstall(async ({ effects }) => {})

// **** PostInstall ****
const postInstall = sdk.setupPostInstall(async ({ effects }) => {
  const btcUsername = `btcshell_${utils.getDefaultString({ charset: 'a-z,A-Z', len: 8 })}`
  const btcPassword = utils.getDefaultString(randomPassword())
  // const btcUsername = `btcshell_user00`
  // const btcPassword =  `Whatever00`

  await sdk.action.requestOwn(effects, resetPassword, 'critical', {
    reason: 'Needed to obtain BTC Shell UI password',
  })

  await sdk.action.request(
    effects,
    'bitcoind',
    generateRpcUserDependent,
    'critical',
    {
      input: {
        kind: 'partial',
        value: {
          username: btcUsername,
          password: btcPassword,
        },
      },
      reason: 'BTC Shell needs an RPC user in Bitcoin',
    },
  )

  await sdk.store.setOwn(effects, sdk.StorePath.btcAuth, {
    username: btcUsername,
    password: btcPassword,
  })
})

// **** Uninstall ****
const uninstall = sdk.setupUninstall(async ({ effects }) => {})

/**
 * Plumbing. DO NOT EDIT.
 */
export const { packageInit, packageUninit, containerInit } = sdk.setupInit(
  versions,
  preInstall,
  postInstall,
  uninstall,
  setInterfaces,
  setDependencies,
  actions,
  initStore,
  exposedStore,
)
