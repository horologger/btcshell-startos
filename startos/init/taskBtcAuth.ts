import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { generateRpcUserDependent } from 'bitcoind-startos/startos/actions/generateRpcUserDependent'
import { randomPassword } from '../utils'
import { storeJson } from '../fileModels/store.json'

export const taskBtcAuth = sdk.setupOnInit(async (effects) => {
  const btcAuth = await storeJson.read((s) => s.btcAuth).const(effects)

  if (!btcAuth || !btcAuth.username || !btcAuth.password) {
    const btcUsername = `btcshell_${utils.getDefaultString({ charset: 'a-z,A-Z', len: 8 })}`
    const btcPassword = utils.getDefaultString(randomPassword())

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
