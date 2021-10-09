import { Message } from "venom-bot";
import { client } from "./index";
import * as stageHandler from "./stages/StageHandler";

export const messageHandler = (message: Message) => {
  const user = message.from;
  const messageContent = message.body;
  const stageSolver = stageHandler.getUserStageSolver(user);
  stageSolver(user, messageContent);
};
