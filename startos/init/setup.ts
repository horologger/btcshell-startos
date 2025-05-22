import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { resetPassword } from '../actions/resetPassword'
import { generateRpcUserDependent } from 'bitcoind-startos/startos/actions/generateRpcUserDependent'
import { randomPassword } from '../utils'
import { storeJson } from '../fileModels/store.json'

export const setup = sdk.setupOnInit(async (effects, kind) => {
  if (kind === 'install') {
    const btcUsername = `btcshell_${utils.getDefaultString({ charset: 'a-z,A-Z', len: 8 })}`
    const btcPassword = utils.getDefaultString(randomPassword())
    // const btcUsername = `btcshell_user00`
    // const btcPassword =  `Whatever00`

    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Needed to obtain BTC Shell UI password',
    })

    await sdk.action.createTask(
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

    await storeJson.merge(effects, {
      btcAuth: {
        username: btcUsername,
        password: btcPassword,
      },
    })
  }
})
