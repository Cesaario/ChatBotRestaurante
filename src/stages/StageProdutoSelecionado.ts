import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Produto } from "../interfaces/IRestauranteConfig";
import { StageOption } from "../interfaces/IStageOptions";
import { setConfirmacaoProdutoSelected } from "./StageConfirmarProduto";
import { setProdutoComAdicionaisSelected } from "./StageExibirAdicionais";

const STAGE = Stages.PRODUTO_SELECIONADO;

const ProdutoSelecionado: Map<string, Produto> = new Map();

export const setProdutoSelected = (user: string, produto: Produto) => {
  ProdutoSelecionado.set(user, produto);
};

export const getProdutoSelected = (user: string) => {
  return ProdutoSelecionado.get(user);
};

const produtoBackOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CATEGORIA_SELECIONADA);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const continuarSemAdicionaisHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CONFIRMAR_PRODUTO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);

  const produtoSelecionado: Produto = { ...getProdutoSelected(user)! };
  produtoSelecionado.adicionais = [];

  setConfirmacaoProdutoSelected(user, produtoSelecionado);
  nextStageSolver(user);
};

const escolherAdicionaisHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.EXIBIR_ADICIONAIS);

  const nextStageSolver = stageHandler.getUserStageSolver(user);
  const produtoSelecionado = getProdutoSelected(user)!;

  setProdutoComAdicionaisSelected(user, produtoSelecionado);
  nextStageSolver(user);
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Continuar sem adicionais",
    handler: continuarSemAdicionaisHandler,
  },
  {
    number: 2,
    title: "Escolher adicionais",
    handler: escolherAdicionaisHandler,
  },
];

const OPTIONS_SEM_ADICIONAIS: StageOption[] = [
  {
    number: 1,
    title: "Continuar",
    handler: continuarSemAdicionaisHandler,
  }
];

const StageProdutoSelecionado = (user: string, message?: string) => {
  const produtoSelecionado = getProdutoSelected(user);
  if (!produtoSelecionado) {
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }
  const possuiAdicionais = produtoSelecionado.adicionais?.length;
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage =
      messageUtils.formatMessageWithProductDetailsAndStageOptions(
        messages.STAGE_PRODUTO_SELECIONADO,
        produtoSelecionado,
        possuiAdicionais ? OPTIONS : OPTIONS_SEM_ADICIONAIS,
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
    produtoBackOptionHandler(user);
    return;
  }

  const optionHandler = stageHandler.getOptionHandler(OPTIONS, optionSelected);
  if (!optionHandler) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  optionHandler.handler(user);
};

export default StageProdutoSelecionado;
