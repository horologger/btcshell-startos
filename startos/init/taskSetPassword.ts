import { sdk } from '../sdk'
import { resetPassword } from '../actions/resetPassword'
import { storeJson } from '../fileModels/store.json'

export const taskSetPassword = sdk.setupOnInit(async (effects) => {
  if (!(await storeJson.read((s) => s.password).const(effects))) {
    await sdk.action.createOwnTask(effects, resetPassword, 'critical', {
      reason: 'Needed to obtain BTC Shell UI password',
    })
  }
})
