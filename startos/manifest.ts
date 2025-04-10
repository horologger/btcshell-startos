import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'btcshell',
  title: 'BTC Shell',
  license: 'apache',
  wrapperRepo: 'https://github.com/horologger/btcshell-startos',
  upstreamRepo: 'https://github.com/horologger/btcshell',
  supportSite: 'https://github.com/horologger/btcshell/issues',
  marketingSite: 'https://github.com/horologger/btcshell',
  donationUrl: null,
  description: {
    short: 'Shell with bitcoin-cli tools.',
    long: 'Shell with bitcoin-cli tools.',
  },
  volumes: ['main'],
  images: { btcshell: { source: { dockerTag: 'horologger/btcshell:v0.0.6' } } },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {
    bitcoind: {
      description: 'BTC Shell uses Bitcoin for all its needs',
      optional: false,
      s9pk: 'https://github.com/Start9Labs/bitcoind-startos/releases/download/v28.1.0.0-alpha.2/bitcoind.s9pk',
    },
  },
})
