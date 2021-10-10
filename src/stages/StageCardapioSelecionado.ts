import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { Categoria } from "../interfaces/IRestauranteConfig";
import { getCategorias, getCategoriaSelected } from "../utils/cardapioUtils";
import { setCategoriaSelected } from "./StageCategoriaSelecionada";

const STAGE = Stages.CARDAPIO_SELECIONADO;

const cardapioOptionHandler = (user: string, categoria: Categoria) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CATEGORIA_SELECIONADA);
  setCategoriaSelected(user, categoria);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const cardapioBackOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.INICIO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const StageCardapioSelecionado = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithCategoriesOptions(
      messages.STAGE_CARDAPIO_SELECIONADO,
      getCategorias(),
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
    cardapioBackOptionHandler(user);
    return;
  }

  const categoriaSelected = getCategoriaSelected(
    optionSelected,
    getCategorias()
  );
  if (!categoriaSelected) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  cardapioOptionHandler(user, categoriaSelected);
};

export default StageCardapioSelecionado;
