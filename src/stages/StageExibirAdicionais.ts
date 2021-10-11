import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Adicional, Produto } from "../interfaces/IRestauranteConfig";
import { getAdicionalSelected } from "../utils/cardapioUtils";
import { addAdicionalSelecionado } from "./StageConfirmarAdicionais";

const STAGE = Stages.EXIBIR_ADICIONAIS;

const ProdutoComAdicionaisSelecionado: Map<string, Produto> = new Map();

export const setProdutoComAdicionaisSelected = (
  user: string,
  produto: Produto
) => {
  ProdutoComAdicionaisSelecionado.set(user, produto);
};

export const getProdutoComAdicionaisSelected = (user: string) => {
  return ProdutoComAdicionaisSelecionado.get(user);
};

const adicionalBackOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.PRODUTO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const adicionalSelecionadoHandler = (user: string, adicional: Adicional) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CONFIRMAR_ADICIONAIS);
  const nextStageSolver = stageHandler.getUserStageSolver(user);

  addAdicionalSelecionado(user, adicional);

  nextStageSolver(user);
};

const StageExibirAdicionais = (user: string, message?: string) => {
  const produtoComAdicionaisSelecionado = getProdutoComAdicionaisSelected(user);
  if (!produtoComAdicionaisSelecionado) {
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithAdicionaisOptions(
      messages.STAGE_EXIBIR_ADICIONAIS,
      produtoComAdicionaisSelecionado.adicionais!,
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
    adicionalBackOptionHandler(user);
    return;
  }

  const adicionalSelecionado = getAdicionalSelected(
    optionSelected,
    produtoComAdicionaisSelecionado.adicionais!
  );
  if (adicionalSelecionado == null) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  adicionalSelecionadoHandler(user, adicionalSelecionado);
};

export default StageExibirAdicionais;
