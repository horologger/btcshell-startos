import { sdk } from '../sdk'
import { setPrimaryUrl } from './set-primary-url'

export const actions = sdk.Actions.of()
  .addAction(setPrimaryUrl)
