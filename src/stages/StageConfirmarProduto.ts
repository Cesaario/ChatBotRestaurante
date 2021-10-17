import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Produto } from "../interfaces/IRestauranteConfig";
import { StageOption } from "../interfaces/IStageOptions";
import { addProductToCart } from "../cart/CartHandler";

const STAGE = Stages.PRODUTO_SELECIONADO;

const ConfirmacaoProdutoSelecionado: Map<string, Produto> = new Map();

export const setConfirmacaoProdutoSelected = (
  user: string,
  produto: Produto
) => {
  ConfirmacaoProdutoSelecionado.set(user, produto);
};

export const getConfirmacaoProdutoSelected = (user: string) => {
  return ConfirmacaoProdutoSelecionado.get(user);
};

const confirmarHandler = (user: string) => {
  addProductToCart(user, getConfirmacaoProdutoSelected(user)!);
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.ADICIONAR_CONFIRMAR_PRODUTOS);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};
const cancelarHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CARDAPIO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};
const produtoConfirmacaoBackOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.PRODUTO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Confirmar produto",
    handler: confirmarHandler,
  },
  {
    number: 2,
    title: "Cancelar produto",
    handler: cancelarHandler,
  },
];

const StageConfirmarProduto = (user: string, message?: string) => {
  const produtoSelecionado = getConfirmacaoProdutoSelected(user);
  if (!produtoSelecionado) {
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage =
      messageUtils.formatMessageWithProductConfirmationAndStageOptions(
        messages.STAGE_CONFIRMAR_PRODUTO,
        produtoSelecionado,
        OPTIONS,
        true
      );
    messageUtils.sendTextMessage(user, optionsMessage);
    stageHandler.setUserOptionsShown(user, STAGE);
    return;
  }

  const optionSelected = messageUtils.getOptionSelected(message);

  if (optionSelected == null) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }

  if (messageUtils.isBackOption(optionSelected)) {
    produtoConfirmacaoBackOptionHandler(user);
    return;
  }

  const optionHandler = stageHandler.getOptionHandler(OPTIONS, optionSelected);
  if (!optionHandler) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  optionHandler.handler(user);
};

export default StageConfirmarProduto;
