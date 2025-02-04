import { Effects } from '@start9labs/start-sdk/base/lib/Effects'
import { sdk } from './sdk'

export const uiPort = 8080

export function randomPassword() {
  return {
    charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
    len: 22,
  }
}
