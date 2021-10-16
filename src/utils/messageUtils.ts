import {
  PLACEHOLDER_ADICIONAIS,
  PLACEHOLDER_DETALHES_PRODUTO,
  PLACEHOLDER_NOME_PRODUTO,
  PLACEHOLDER_OPTIONS,
  PLACEHOLDER_RESUMO_CARRINHO,
  PLACEHOLDER_VALOR,
} from "../constants/Messages";
import { client } from "../index";
import { Cart } from "../interfaces/ICart";
import {
  Adicional,
  Categoria,
  Produto,
} from "../interfaces/IRestauranteConfig";

import { StageOption } from "../interfaces/IStageOptions";
import { Pagamento } from "../stages/StagePagamento";
import {
  calcularValorProdutoComAdicionais,
  formatAdicionais,
  formatCategorias,
  formatProduto,
  gerarResumoCarrinhoComValoresSemAdicionais,
} from "./cardapioUtils";
import { formatarValor } from "./moneyUtils";

export const formatOptions = (options: StageOption[], backOption = false) => {
  const opcoesMapeadas = options.map(
    (option) => `${option.number}) ${option.title}`
  );
  if (backOption) opcoesMapeadas.push("0) Voltar");

  return opcoesMapeadas.join("\n");
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

export const formatMessageWithAdicionaisOptions = (
  message: string,
  options: Adicional[],
  backOption = false
) => {
  return message.replace(
    PLACEHOLDER_OPTIONS,
    formatAdicionais(options, true, backOption)
  );
};

export const formatMessageWithProductDetailsAndStageOptions = (
  message: string,
  product: Produto,
  options: StageOption[],
  backOption = false
) => {
  const mensagemFormatada = message
    .replace(PLACEHOLDER_NOME_PRODUTO, product.nome)
    .replace(PLACEHOLDER_DETALHES_PRODUTO, product.desc || "")
    .replace(PLACEHOLDER_OPTIONS, formatOptions(options, backOption));
  return mensagemFormatada;
};

export const formatMessageWithProductConfirmationAndStageOptions = (
  message: string,
  product: Produto,
  options: StageOption[],
  backOption = false
) => {
  const mensagemFormatada = message
    .replace(PLACEHOLDER_NOME_PRODUTO, product.nome)
    .replace(
      PLACEHOLDER_ADICIONAIS,
      formatAdicionais(product.adicionais, false, false)
    )
    .replace(PLACEHOLDER_VALOR, formatarValor(calcularValorProdutoComAdicionais(product)))
    .replace(PLACEHOLDER_OPTIONS, formatOptions(options, backOption));
  return mensagemFormatada;
};

export const formatMessageWithOrderConfirmationAndStageOptions = (
  message: string,
  cart: Cart,
  options: StageOption[]
) => {
  const mensagemFormatada = message
    .replace(PLACEHOLDER_RESUMO_CARRINHO, gerarResumoCarrinhoComValoresSemAdicionais(cart))
    .replace(PLACEHOLDER_OPTIONS, formatOptions(options));
  return mensagemFormatada;
};

export const formatMessageWithAdicionaisSelectedAndStageOptions = (
  message: string,
  adicionais: Adicional[],
  options: StageOption[]
) => {
  const mensagemFormatada = message
    .replace(PLACEHOLDER_ADICIONAIS, formatAdicionais(adicionais, false))
    .replace(PLACEHOLDER_OPTIONS, formatOptions(options));
  return mensagemFormatada;
};

export const formatFormaPagamento = (pagemento: Pagamento) => `${pagemento.tipo} (${pagemento.detalhes})`
 
export const getOptionSelected = (message?: string) => {
  if (message == null) return null;
  return Number(message);
};

export const sendTextMessage = (user: string, message: string) => {
  client.sendText(user, message);
};

export const isBackOption = (option: number) => option === 0;
