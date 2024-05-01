import {required} from "../utils/args";
import {Action} from "../types";
import {Factory} from "nomos-v2";

//connection from CONSTANTINE to OSMOSIS TESTNET
//connectionID: "connection-81",
//counterPartyConnectionID: "connection-1427",

const execute: Action = async (action) => {
  const {args, client, accounts} = action;

  required(args, "contract");

  const factory = new Factory(client, accounts[0].address, args.contract as string);

  // Create a new multisig wallet
  const {transactionHash} = await factory.createMultisig(
    {
      //connection from ARCHWAY to OSMOSIS
      channelOpenInitOptions: {
        connection_id: "connection-81",
        counterparty_connection_id: "connection-1427",
      },
      instantiateMultisigMsg: {
        automatic_execution: true,
        max_voting_period: {height: 10000},
        members: [
          {
            addr: accounts[0].address,
            weight: 100,
          },
        ],
        open_proposal_submission: false,
        revoting: false,
        threshold: {absolute_count: {weight: 200}},
      },
      salt: `salt-${accounts[0].address}`,
    },
    "auto",
    "Creating a new multisig wallet",
    []
  );

  return {
    transaction: transactionHash,
  };
};

export default execute;
