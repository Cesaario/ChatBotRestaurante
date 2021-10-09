import * as messageUtils from "../utils/messageUtils";

const StageCardapioSelecionado = (user: string, message: string | null) => {
  messageUtils.sendTextMessage(user, "deu :)");
};

export default StageCardapioSelecionado;
