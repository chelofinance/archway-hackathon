import {required} from "../utils/args";
import {Action} from "../types";
import {OfflineAminoSigner, StdSignDoc} from "@cosmjs/amino";
import {makeSignDoc, AminoMsg} from "@cosmjs/amino";
import {Vote} from "nomos-v2";
import {AminoMsgForSignedVote, StdSignDocForSignedVote} from "nomos-v2/lib/src/Vote.types";

const generateSignature = async (
  signer: OfflineAminoSigner,
  chainId: string,
  vote: {vote: string; proposal: string; contract: string}
) => {
  const account = (await signer.getAccounts())[0];
  const message: AminoMsg = {
    type: "",
    value: vote,
  };

  const signDoc = makeSignDoc([message], {amount: [], gas: "0"}, chainId, "", 0, 0, BigInt(1));

  const {signature, signed} = await signer.signAmino(account.address, signDoc);

  return {signature, signed};
};

const mapSignDoc = (doc: StdSignDoc): StdSignDocForSignedVote => {
  return {
    account_number: doc.account_number,
    chain_id: doc.chain_id,
    fee: {
      amount: doc.fee.amount as any,
      gas: doc.fee.gas,
    },
    memo: doc.memo,
    msgs: doc.msgs as AminoMsgForSignedVote[],
    sequence: doc.sequence,
    timeout_height: doc.timeout_height || "1",
  };
};

const execute: Action = async (action) => {
  const {args, client, aminoSigner, accounts, network} = action;

  required(args, "contract");
  required(args, "proposal");
  required(args, "vote", ["yes", "no", "abstain", "veto"]);

  const {signature, signed} = await generateSignature(aminoSigner, network.chainId, {
    proposal: args.proposal as any,
    vote: args.vote as string,
    contract: args.contract as string,
  });
  const vote = new Vote(client, accounts[0].address, args.contract as string);

  const {transactionHash, height} = await vote.voteWithSigature({
    signature: {
      public_key: signature.pub_key.value,
      sign_doc: signed as any,
      signature: signature.signature,
    },
  });

  return {
    transaction: transactionHash,
    height,
  };
};

export default execute;
