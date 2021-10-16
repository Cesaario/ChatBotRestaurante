import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { StageOption } from "../interfaces/IStageOptions";
import { getUserCart } from "../cart/CartHandler";
import { getEndereco } from "./StageEndereco";
import { getFormaPagamento } from "./StagePagamento";
import { gerarResumoPedido } from "../utils/generalUtils";

const STAGE = Stages.CONFIRMAR_CANCELAR_PEDIDO;

const handleDescartarPedido = (user: string) => {
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.INICIO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);

  //TODO: Limpar todos os dados do usuário no caminho;
}

const handlerConfirmarPedido = (user: string) => {
  const carrinho = getUserCart(user);
  const endereco = getEndereco(user);
  const formaPagamento = getFormaPagamento(user);

  if(!endereco || !formaPagamento){
    messageUtils.sendTextMessage(user, messages.ERRO_GENERICO);
    return;
  }

  const resumoPedido = gerarResumoPedido({user, carrinho, endereco, formaPagamento});

  messageUtils.sendTextMessage(user, messages.SUCESSO);
  messageUtils.sendTextMessage(user, resumoPedido);

  //Voltar para o início?
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.INICIO);
}

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: "Confirmar pedido",
    handler: handlerConfirmarPedido,
  },
  {
    number: 2,
    title: "Descartar pedido",
    handler: handleDescartarPedido,
  },
];

const StageConfirmarPedido = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithStageOptions(
      messages.FORMA_PAGAMENTO,
      OPTIONS
    );
    messageUtils.sendTextMessage(user, optionsMessage);
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

export default StageConfirmarPedido;
