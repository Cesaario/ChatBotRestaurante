import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { StageOption } from "../interfaces/IStageOptions";
import { restaurante } from "../config/configHandler";

const STAGE = Stages.INICIO;

const cardapioOptionHandler = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CARDAPIO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const contatoHandler = (user: string) => {
  messageUtils.sendTextMessage(
    user,
    messageUtils.formatContato(messages.CONTATO, restaurante.contato)
  );
};

const horarioFuncionamentoHandler = (user: string) => {
  messageUtils.sendTextMessage(
    user,
    messageUtils.formatHorarioFuncionamento(
      messages.HORARIO_FUNCIOMENTO,
      restaurante.horarioDeFuncionamento
    )
  );
};

const enderecoHandler = (user: string) => {
  messageUtils.sendTextMessage(
    user,
    messageUtils.formatEndereco(messages.ENDERECO, restaurante.endereco)
  );
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Cardápio",
    handler: cardapioOptionHandler,
  },
  {
    number: 2,
    title: "Horário de Funcionamento",
    handler: horarioFuncionamentoHandler,
  },
  {
    number: 3,
    title: "Endereço",
    handler: enderecoHandler,
  },
  {
    number: 4,
    title: "Contato",
    handler: contatoHandler,
  },
];

const StageInicio = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optonsMessage = messageUtils.formatMessageWithStageOptions(
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
