import { PLACEHOLDER_OPTIONS } from "../constants/Messages";
import { client } from "../index";

import { StageOption } from "../interfaces/IStageOptions";

export const formatOptions = (options: StageOption[]) => {
  return options.map((option) => `${option.number}) ${option.title}`).join("\n");
};

export const formatMessageWithOptions = (
  message: string,
  options: StageOption[]
) => {
  return message.replace(PLACEHOLDER_OPTIONS, formatOptions(options));
};

export const getOptionSelected = (message?: string) => {
  return Number(message) || null;
};

export const sendTextMessage = (user: string, message: string) => {
  client.sendText(user, message);
};
