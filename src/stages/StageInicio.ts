import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { StageOption } from "../interfaces/IStageOptions";

const STAGE = Stages.INICIO;

const cardapioOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CARDAPIO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Cardápio",
    handler: cardapioOptionHandler,
  },
];

const StageInicio = (user: string, message: string | null) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optonsMessage = messageUtils.formatMessageWithOptions(
      messages.STAGE_INICIO,
      OPTIONS
    );
    messageUtils.sendTextMessage(user, optonsMessage);
    stageHandler.setUserOptionsShown(user, STAGE);
    return;
  }
  const optionSelected = messageUtils.getOptionSelected(message);
  const optionHandler = stageHandler.getOptionHandler(OPTIONS, optionSelected);
  if (!optionHandler) {
    messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
    return;
  }
  optionHandler.handler(user);
};

export default StageInicio;
