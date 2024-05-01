import {required} from "../utils/args";
import {Action} from "../types";
import {Vote} from "nomos-v2";

type VoteType = "yes" | "no" | "abstain" | "veto";

const execute: Action = async (action) => {
  const {args, client, accounts} = action;

  required(args, "contract");
  required(args, "proposal");
  required(args, "vote", ["yes", "no", "abstain", "veto"]);

  // Initialization of the client and VoteClient
  const voteClient = new Vote(client, accounts[0].address, args.contract as string);

  // Proposing a new change
  const {transactionHash, height} = await voteClient.vote({
    proposalId: args.proposal as number,
    vote: args.vote as VoteType,
  });

  return {
    transaction: transactionHash,
    height,
  };
};

export default execute;
