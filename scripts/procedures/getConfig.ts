// To utilize the default config system built, this file is required. It defines the *structure* of the configuration file. These structured options display as changeable UI elements within the "Config" section of the service details page in the StartOS UI.

import { compat, types as T } from "../deps.ts";

// export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({});

// https://docs.start9.com/0.3.5.x/developer-docs/specification/config-spec#string

export const getConfig: T.ExpectedExports.getConfig = compat.getConfig({
    "tor-address": {
      "name": "Tor Address",
      "description": "The Tor address of the network interface",
      "type": "pointer",
      "subtype": "package",
      "package-id": "btcshell",
      "target": "tor-address",
      "interface": "main",
    },
    "lan-address": {
      "name": "LAN Address",
      "description": "The LAN address of the network interface",
      "type": "pointer",
      "subtype": "package",
      "package-id": "btcshell",
      "target": "lan-address",
      "interface": "main",
    },
    "user": {
        "type": "string",
        "name": "User",
        "default": "admin",
        "description": "HTTP BasicAuth Username",
        "copyable": true,
        "nullable": false    
    },
    "password": {
        "type": "string",
        "name": "Password",
        "description": "HTTP BasicAuth Password",
        "masked": true,
        "copyable": true,
        "nullable": false,    
        "default": {
          "charset": "a-z,A-Z,0-9",
          "len": 22
        }
    },
    "bitcoind-user": {
      type: "pointer",
      name: "RPC Username",
      description: "The username for Bitcoin Core's RPC interface",
      subtype: "package",
      "package-id": "bitcoind",
      target: "config",
      multi: false,
      selector: "$.rpc.username",
    },
    "bitcoind-password": {
      type: "pointer",
      name: "RPC Password",
      description: "The password for Bitcoin Core's RPC interface",
      subtype: "package",
      "package-id": "bitcoind",
      target: "config",
      multi: false,
      selector: "$.rpc.password",
    }
  });