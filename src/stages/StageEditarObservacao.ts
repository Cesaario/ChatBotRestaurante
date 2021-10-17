import { Stages } from "../constants/StagesEnum";
import * as stageHandler from "./StageHandler";
import * as messages from "../constants/Messages";
import * as messageUtils from "../utils/messageUtils";
import { getProdutoSelected, setProdutoSelected } from "./StageProdutoSelecionado";
import { Produto } from "../interfaces/IRestauranteConfig";

const STAGE = Stages.EDITAR_OBSERVACAO;

const StageEditarObservacao = async (user: string, message?: string) => {
  if (!stageHandler.getUserOptionsShown(user, STAGE)) {
    messageUtils.sendTextMessage(user, messages.OBSERVACAO);
    stageHandler.setUserOptionsShown(user, STAGE);
    return;
  }

  const produtoSelecionado = { ...getProdutoSelected(user)! };
  produtoSelecionado.observacao = message;
  setProdutoSelected(user, produtoSelecionado);

  await messageUtils.sendTextMessage(user, messages.OBSERVACAO_ATUALIZADA);

  stageHandler.setUserOptionsNotShown(user, STAGE);
  stageHandler.setUserStage(user, Stages.PRODUTO_SELECIONADO);
  const nextStageSolver = stageHandler.getUserStageSolver(user);
  nextStageSolver(user);
};

export default StageEditarObservacao;
