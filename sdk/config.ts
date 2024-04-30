import {Config} from "./types";

const config: Config = {
  networks: {
    "archway-mainnet": {
      chainId: "archway-1",
      node: "https://rpc.mainnet.archway.io:443",
      gasPrice: "1000000000000aarch",
      gasAdjustment: 1.3,
      prefix: "archway",
    },
    "archway-testnet": {
      chainId: "constantine-3",
      node: "https://rpc.constantine.archway.tech:443",
      gasPrice: "300000000000aconst",
      gasAdjustment: 1.2,
      prefix: "archway",
    },
  },
};

export default config;
