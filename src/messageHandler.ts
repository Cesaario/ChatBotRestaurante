import { Message } from "venom-bot";
import { client } from "./index";

export const messageHandler = (message: Message) => {
  const user = message.from;
  client.sendText(user, "coe kkkkk");
};
