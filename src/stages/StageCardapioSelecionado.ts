import * as messageUtils from "../utils/messageUtils";

const StageCardapioSelecionado = (user: string, message?: string) => {
  messageUtils.sendTextMessage(user, "deu :)");
};

export default StageCardapioSelecionado;
