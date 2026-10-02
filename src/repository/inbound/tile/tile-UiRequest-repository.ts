import { TileUpdateMessage } from "../../../messaging/tileUpdateMessage.ts";
import TileManagementService from "../../../services/TileManagement.service.ts";
import TileToUIRepository from "../../outbound/tile/tile-toUiResponse-repository.ts";

interface Deps {
  tileManagementService: TileManagementService;
}

/** for handle request message from ui */
export default class TileUiRequestRepository {
  private readonly tileManagement: TileManagementService;

  constructor(deps: Deps) {
    this.tileManagement = deps.tileManagementService;
  }

  messageRequest(message: TileUpdateMessage) {
    const messageAction = message.action;
    let tile;
    switch (messageAction.name) {
      case "preparing":
        tile = this.tileManagement.prepareTile(messageAction.position);
        break;
      case "watering":
        tile = this.tileManagement.waterTile(messageAction.position);
        break;
      default:
        tile = null;
    }
  }
}
