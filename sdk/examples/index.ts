import {Action} from "../types";
import create_multisig from "./create_multisig";
import create_proposal from "./create_proposal";
import vote_proposal from "./vote_proposal";
import vote_signature from "./vote_signature";

export const actions: Record<string, Action> = {
  create_multisig,
  create_proposal,
  vote_proposal,
  vote_signature,
};
