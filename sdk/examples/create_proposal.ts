import {required} from "../utils/args";
import {Action} from "../types";
import {Vote} from "nomos-v2";

const execute: Action = async (action) => {
  const {args, client, accounts} = action;

  required(args, "contract");

  // Initialization of the client and VoteClient
  const voteClient = new Vote(client, accounts[0].address, args.contract as string);

  // Proposing a new change
  const {transactionHash, height} = await voteClient.propose({
    title: "Update Protocol",
    description: "Proposal to update the protocol to version 2.0",
    msgs: [
      {
        bank: {
          send: {
            to_address: accounts[0].address,
            amount: [
              {
                denom: "aconst",
                amount: "1",
              },
            ],
          },
        },
      },
    ],
  });

  return {
    transaction: transactionHash,
    height,
  };
};

export default execute;
