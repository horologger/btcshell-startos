import { setupManifest } from '@start9labs/start-sdk'

export const manifest = setupManifest({
  id: 'btcshell',
  title: 'BTCShell',
  license: 'mit',
  wrapperRepo: 'https://github.com/horologger/btcshell-startos',
  upstreamRepo: 'https://github.com/horologger/btcshell',
  supportSite: 'https://github.com/horologger/btcshell/issues',
  marketingSite: 'https://github.com/horologger/btcshell',
  donationUrl: null,
  description: {
    short: 'Shell with bitcoin-cli tools.',
    long: 'Shell with bitcoin-cli tools.',
  },
  assets: [],
  volumes: ['main'],
  images: {
    btcshell: {
      source: {
        dockerTag: 'horologger/btcshell:v0.0.4',
      },
    },
  },
  hardwareRequirements: {},
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  dependencies: {},
})
