import fs, {readFileSync} from "fs";
import {DirectSecp256k1HdWallet, OfflineDirectSigner} from "@cosmjs/proto-signing";
import {GasPrice} from "@cosmjs/stargate";
import {SigningCosmWasmClient} from "@cosmjs/cosmwasm-stargate";
import dotenv from "dotenv";
import {NetworkConfig} from "types";
dotenv.config();

export const loadMnemonic = (path: string) => {
  const mnemonic = readFileSync(path).toString();
  return mnemonic.replace("\n", "");
};

export const loadSignerFromMnemonic = (network: NetworkConfig): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(process.env.MNEMONIC as string, {
    prefix: network.prefix,
  });
};

export const getSigningClient = async (network: NetworkConfig, signer: OfflineDirectSigner) => {
  return await SigningCosmWasmClient.connectWithSigner(network.node, signer, {
    gasPrice: GasPrice.fromString(network.gasPrice),
  });
};
