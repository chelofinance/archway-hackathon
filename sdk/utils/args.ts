import {Arguments} from "../types";
import fs from "fs";

export function isValidJSON(str: string) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

export const required = (args: Arguments, field: keyof Arguments, expected?: unknown[]) => {
  if (!args[field]) throw new Error(`Field ${field} is required by this action`);
  if (expected && !expected.includes(args[field]))
    throw new Error(`Field ${field} must have any of the values ${expected.join(", ")}`);
};

export const getMessage = (msg: string) => {
  if (isValidJSON(msg)) {
    return JSON.parse(msg);
  } else {
    const messageFilePath = msg;
    const messageFileContent = fs.readFileSync(messageFilePath, "utf-8");

    try {
      const messageObject = JSON.parse(messageFileContent);
      return messageObject;
    } catch (error: any) {
      throw new Error(`Failed to parse JSON in the message file: ${error.message}`);
    }
  }
};
