import { GameReceiveMessage } from "../../../messaging/gameMessage.ts";
import TileUiRequestRepository from "../tile/tile-UiRequest-repository.ts";

interface Deps {
  tileUiRequestRepository: TileUiRequestRepository;
}

export default class WebViewMessageReceiver {
  private tileRequest: TileUiRequestRepository;
  constructor(deps: Deps) {
    this.tileRequest = deps.tileUiRequestRepository;
  }

  receive(message: GameReceiveMessage) {
    switch (message.type) {
      case "tile:update":
        this.tileRequest.messageRequest(message);
        break;
      case "farm:update":
        break;
      default:
    }
  }
}
