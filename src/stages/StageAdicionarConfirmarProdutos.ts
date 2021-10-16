import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { StageOption } from "../interfaces/IStageOptions";
import { getUserCart } from "../cart/CartHandler";

const STAGE = Stages.ADICIONAR_CONFIRMAR_PRODUTOS;

const concluirPedidoHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.ENDERECO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const adicionarMaisHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CARDAPIO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Adicionar mais produtos",
    handler: adicionarMaisHandler,
  },
  {
    number: 2,
    title: "Concluir pedido",
    handler: concluirPedidoHandler,
  },
];

const StageAdicionarConfirmarProdutos = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage =
      messageUtils.formatMessageWithOrderConfirmationAndStageOptions(
        messages.STAGE_CONFIRMAR_PEDIDO,
        getUserCart(user),
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

export default StageAdicionarConfirmarProdutos;
