import { setupManifest } from '@start9labs/start-sdk'
import { SDKImageInputSpec } from '@start9labs/start-sdk/base/lib/types/ManifestTypes'

const BUILD = process.env.BUILD || ''

const arch =
  BUILD === 'x86_64' || BUILD === 'aarch64' ? [BUILD] : ['x86_64', 'aarch64']

export const manifest = setupManifest({
  id: 'btcshell',
  title: 'BTC Shell',
  license: 'apache',
  wrapperRepo: 'https://github.com/horologger/btcshell-startos',
  upstreamRepo: 'https://github.com/horologger/btcshell',
  supportSite: 'https://github.com/horologger/btcshell/issues',
  marketingSite: 'https://github.com/horologger/btcshell',
  docsUrl:
    'https://github.com/horologger/btcshell-startos/blob/main/instructions.md',
  donationUrl: null,
  description: {
    short: 'Shell with bitcoin-cli tools.',
    long: 'Shell with bitcoin-cli tools.',
  },
  volumes: ['main'],
  images: { 
    btcshell: { 
      source: { dockerTag: 'horologger/btcshell:v0.0.6' 

      } ,
      arch,
    } as SDKImageInputSpec,
  },
  hardwareRequirements: {
    arch,
  },
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
      description: 'Used to subscribe to new block events.',
      optional: true,
      metadata: {
        title: 'A Bitcoin Full Node',
        icon: 'https://bitcoin.org/img/icons/opengraph.png',
      },
    },
  },
})
