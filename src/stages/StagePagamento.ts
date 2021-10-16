import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import {
  FormasPagamento,
  InstrucoesFormaPagamento,
} from "../constants/FormaPagamento";
import { StageOption } from "../interfaces/IStageOptions";

const STAGE = Stages.PAGAMENTO;

export interface Pagamento {
  tipo: FormasPagamento;
  detalhes: string | null;
}

const FormaPagamentoSelecionada: Map<string, Pagamento> = new Map();

export const setFormaPagamento = (user: string, pagamento: Pagamento) => {
  FormaPagamentoSelecionada.set(user, pagamento);
};

export const setDetalhesPagamento = (user: string, detalhes: string) => {
  const detalhesAtuais = getFormaPagamento(user)!;
  setFormaPagamento(user, { ...detalhesAtuais, detalhes });
};

export const getFormaPagamento = (user: string) => {
  return FormaPagamentoSelecionada.get(user);
};

const handleFormaPagamento = (
  user: string,
  formaPagamento: FormasPagamento
) => {
  setFormaPagamento(user, { tipo: formaPagamento, detalhes: null });
  const instrucoes = InstrucoesFormaPagamento[formaPagamento];
  messageUtils.sendTextMessage(user, instrucoes);
};

const handleDetalhesPagamento = (
  user: string,
  detalhes: string
) => {
  setDetalhesPagamento(user, detalhes);
  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.CONFIRMAR_CANCELAR_PEDIDO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

const possuiFormaSelecionada = (user: string) => {
  return Boolean(getFormaPagamento(user));
};

const OPTIONS: StageOption[] = [
  {
    number: 1,
    title: FormasPagamento.DINHEIRO,
    handler: (user: string) =>
      handleFormaPagamento(user, FormasPagamento.DINHEIRO),
  },
  {
    number: 2,
    title: FormasPagamento.CARTAO,
    handler: (user: string) =>
      handleFormaPagamento(user, FormasPagamento.CARTAO),
  },
];

const StagePagamento = (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    const optionsMessage = messageUtils.formatMessageWithStageOptions(
      messages.FORMA_PAGAMENTO,
      OPTIONS
    );
    messageUtils.sendTextMessage(user, optionsMessage);
    stageHandler.setUserOptionsShown(user, STAGE);
    return;
  }
  if (!possuiFormaSelecionada(user)) {
    const optionSelected = messageUtils.getOptionSelected(message);
    const optionHandler = stageHandler.getOptionHandler(
      OPTIONS,
      optionSelected
    );
    if (!optionHandler) {
      messageUtils.sendTextMessage(user, messages.OPCAO_INVALIDA);
      return;
    }
    optionHandler.handler(user);
  } else {
    handleDetalhesPagamento(user, message!);
  }
};

export default StagePagamento;
