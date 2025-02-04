import { utils } from '@start9labs/start-sdk'
import { sdk } from '../sdk'
import { randomPassword } from '../utils'

export const resetPassword = sdk.Action.withoutInput(
  // id
  'reset-password',

  // metadata
  async ({ effects }) => {
    const hasPassword = await sdk.store
      .getOwn(effects, sdk.StorePath.hasPass)
      .const()

    return {
      name: hasPassword ? 'Reset password' : 'Create password',
      description: hasPassword
        ? 'Reset your BTC Shell UI password'
        : 'Create your BTC Shell UI password',
      warning: null,
      allowedStatuses: 'any',
      group: null,
      visibility: 'enabled',
    }
  },

  // the execution function
  async ({ effects }) => {
    const password = utils.getDefaultString(randomPassword())

    await sdk.store.setOwn(effects, sdk.StorePath.hasPass, true)

    return {
      version: '1',
      title: 'Success',
      message:
        'Your password is below. Write it down or save it to a password manager.',
      result: {
        type: 'single',
        value: password,
        masked: true,
        copyable: true,
        qr: false,
      },
    }
  },
)
