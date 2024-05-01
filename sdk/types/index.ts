import {OfflineAminoSigner} from "@cosmjs/amino";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import {OfflineDirectSigner} from "@cosmjs/proto-signing";

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
  signer: OfflineDirectSigner;
  aminoSigner: OfflineAminoSigner;
  config: Config;
  network: NetworkConfig;
  client: SigningCosmWasmClient;
  accounts: Account[];
}) => unknown;
