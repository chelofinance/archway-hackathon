import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";

export type NetworkConfig = {
  chainId: string;
  node: string;
  prefix: string;
  gasPrice: string;
  gasAdjustment: number;
};

export type Config = {
  networks: Record<string, NetworkConfig>;
};

export type Account = {
  address: string;
};

export type Arguments = {
  chain: string;
  action: string;

  [k: string]: unknown;
};

export type Action = (args: {
  args: Arguments;
  config: Config;
  client: SigningCosmWasmClient;
  accounts: Account[];
}) => unknown;
