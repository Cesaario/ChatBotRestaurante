import { PLACEHOLDER_OPTIONS } from "../constants/Messages";
import { client } from "../index";
import { Categoria, Produto } from "../interfaces/IRestauranteConfig";

import { StageOption } from "../interfaces/IStageOptions";
import { formatCategorias, formatProduto } from "./cardapioUtils";

export const formatOptions = (options: StageOption[]) => {
  return options
    .map((option) => `${option.number}) ${option.title}`)
    .join("\n");
};

export const formatMessageWithStageOptions = (
  message: string,
  options: StageOption[]
) => {
  return message.replace(PLACEHOLDER_OPTIONS, formatOptions(options));
};

export const formatMessageWithCategoriesOptions = (
  message: string,
  options: Categoria[],
  backOption = false
) => {
  return message.replace(
    PLACEHOLDER_OPTIONS,
    formatCategorias(options, backOption)
  );
};

export const formatMessageWithProductsOptions = (
  message: string,
  options: Produto[],
  backOption = false
) => {
  return message.replace(
    PLACEHOLDER_OPTIONS,
    formatProduto(options, backOption)
  );
};

export const getOptionSelected = (message?: string) => {
  if (message == null) return null;
  return Number(message);
};

export const sendTextMessage = (user: string, message: string) => {
  client.sendText(user, message);
};

export const isBackOption = (option: number) => option === 0;
