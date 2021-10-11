import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Adicional, Produto } from "../interfaces/IRestauranteConfig";
import { StageOption } from "../interfaces/IStageOptions";
import { getProdutoComAdicionaisSelected } from "./StageExibirAdicionais";
import { setConfirmacaoProdutoSelected } from "./StageConfirmarProduto";

const STAGE = Stages.CONFIRMAR_ADICIONAIS;

const AdicionaisSelecionados: Map<string, Adicional[]> = new Map();

export const getAdicionaisSelecionados = (user: string) => {
  return AdicionaisSelecionados.get(user) || [];
};

export const addAdicionalSelecionado = (user: string, adicional: Adicional) => {
  const selecionados = getAdicionaisSelecionados(user);
  AdicionaisSelecionados.set(user, [...selecionados, adicional]);
};

export const clearAdicionaisSelecionados = (user: string) => {
  AdicionaisSelecionados.delete(user);
};

const confirmarHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CONFIRMAR_PRODUTO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);

  const produtoSelecionado: Produto = { ...getProdutoComAdicionaisSelected(user)! };
  const adicionaisSelecionados = [...getAdicionaisSelecionados(user)];
  produtoSelecionado.adicionais = adicionaisSelecionados;

  setConfirmacaoProdutoSelected(user, produtoSelecionado);
  nextStageSolver(user);
}

const escolherMaisHandler = (user: string) => { 
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.EXIBIR_ADICIONAIS);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
}

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Confirmar adicionais",
    handler: confirmarHandler,
  },
  {
    number: 2,
    title: "Escolher mais adicionais",
    handler: escolherMaisHandler,
  },
];

const StageConfirmarAdicionais = (user: string, message?: string) => {
  const adicionaisSelecionados = getAdicionaisSelecionados(user);
  if (adicionaisSelecionados.length === 0) {
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithAdicionaisSelectedAndStageOptions(
      messages.STAGE_CONFIRMAR_ADICIONAIS,
      adicionaisSelecionados,
      OPTIONS
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

  const optionHandler = stageHandler.getOptionHandler(OPTIONS, optionSelected);
  if (!optionHandler) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  optionHandler.handler(user);
};

export default StageConfirmarAdicionais;
