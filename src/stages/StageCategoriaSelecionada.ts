import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Categoria, Produto } from "../interfaces/IRestauranteConfig";
import { getProdutoSelected } from "../utils/cardapioUtils";
import { setProdutoSelected } from "./StageProdutoSelecionado";

const STAGE = Stages.CATEGORIA_SELECIONADA;

const CategoriaSelecionada: Map<string, Categoria> = new Map();

export const setCategoriaSelected = (user: string, categoria: Categoria) => {
  CategoriaSelecionada.set(user, categoria);
};

export const getCategoriaSelected = (user: string) => {
  return CategoriaSelecionada.get(user);
};

const categoriaBackOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CARDAPIO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const produtoSelecionadoHandler = (user: string, produto: Produto) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.PRODUTO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  setProdutoSelected(user, produto);
  nextStageSolver(user);
};

const StageCategoriaSelecionada = (user: string, message?: string) => {
  const categoriaSelecionada = getCategoriaSelected(user);
  if (!categoriaSelecionada) {
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithProductsOptions(
      messages.STAGE_CATEGORIA_SELECIONADO,
      categoriaSelecionada.produtos,
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
    categoriaBackOptionHandler(user);
    return;
  }

  const produtoSelecionado = getProdutoSelected(
    optionSelected,
    categoriaSelecionada.produtos
  );
  if (produtoSelecionado == null) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }

  produtoSelecionadoHandler(user, produtoSelecionado);
};

export default StageCategoriaSelecionada;
