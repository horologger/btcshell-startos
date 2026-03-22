export const uiPort = 8080
export const bitcoindMountpoint = '/mnt/bitcoind'
// BITCOIN_RPC_COOKIEFILE: `${bitcoindMountpoint}/.cookie`,
export function randomPassword() {
  return {
    // charset: 'a-z,A-Z,1-9,!,@,$,%,&,*',
    charset: 'a-z,A-Z,1-9',
    len: 22,
  }
}
