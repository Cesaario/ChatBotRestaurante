import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { calcularTaxaEntrega } from "../utils/enderecoUtils";
import { formatarValor } from "../utils/moneyUtils";
import { setTaxaEntrega } from "../cart/CartHandler";

const STAGE = Stages.ENDERECO;

const EnderecoSelecionado: Map<string, string> = new Map();

export const setEndereco = (user: string, endereco: string) => {
  EnderecoSelecionado.set(user, endereco);
};

export const getEndereco = (user: string) => {
  return EnderecoSelecionado.get(user);
};

const StageEndereco = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    messageUtils.sendTextMessage(user, messages.STAGE_ENDERECO);
    stageHandler.setUserOptionsShown(user, STAGE);
    return;
  }

  if(!message){ //TODO: Fazer uma validação melhor para o endereço talvez?
    messageUtils.sendTextMessage(user, messages.ENDERECO_INVALIDO);
    return;
  }

  setEndereco(user, message);
  
  const taxaEntrega = calcularTaxaEntrega(getEndereco(user)!);
  const taxaEntregaFormatada = formatarValor(taxaEntrega);
  messageUtils.sendTextMessage(user, messages.TAXA_ENTREGA.replace(messages.PLACEHOLDER_VALOR, taxaEntregaFormatada))

  setTaxaEntrega(user, taxaEntrega);

  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.PAGAMENTO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
}

export default StageEndereco;
