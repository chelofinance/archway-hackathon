import dotenv from "dotenv";
import {getSigningClient, loadSignerFromMnemonic} from "./utils/wallet";
import yargs from "yargs";
import config from "./config";
import {actions} from "./examples";
import {Arguments} from "./types";
import {getMessage} from "./utils/args";

dotenv.config();

const main = async () => {
  const args = yargs(process.argv.slice(2)).options({
    chain: {type: "string", demandOption: true, alias: "c", desc: "chain to interact with"},
    action: {type: "string", demandOption: true, alias: "a", desc: "action"},

    contract: {type: "string", demandOption: false, alias: "sc", desc: "contract"},
    codeId: {type: "number", demandOption: false, desc: "code id of contract"},
    message: {type: "string", demandOption: false, desc: "message to send to contract"},
    label: {type: "string", demandOption: false, desc: "label of contract"},
  }).argv as Arguments;

  if (args.message) args.message = getMessage(args.message as any);

  const network = config.networks[args.chain];
  const action = actions[args.action];

  if (!network) throw new Error(`network ${args.chain} not in config file`);
  if (!action) throw new Error(`action ${args.action} not implemented`);

  const signer = await loadSignerFromMnemonic(network);
  const client = await getSigningClient(network, signer);
  const accounts = await signer.getAccounts();
  const response = await action({
    client,
    accounts: accounts.map(({address}) => ({
      address,
    })),
    args,
    config,
  });

  console.log(response);
};

main();
