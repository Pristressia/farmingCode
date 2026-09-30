import { GameReceiveMessage } from "../../../messaging/GameReceiveMessage.ts";
import { TileUpdateMessage } from "../../../messaging/tileUpdateMessage.ts";
import TileManagementService from "../../../services/TileManagement.service.ts";
import TileToUIRepository from "../../outbound/tile/tile-toUiResponse-repository.ts";

interface Deps {
  tileManagementService: TileManagementService;
  tileToUIReponseRepo: TileToUIRepository;
}

export default class TileUiRequestRepository {
  private readonly tileManagement: TileManagementService;
  private readonly tileToUIReponseRepo: TileToUIRepository;

  constructor(deps: Deps) {
    this.tileManagement = deps.tileManagementService;
    this.tileToUIReponseRepo = deps.tileToUIReponseRepo;
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

    return this.tileToUIReponseRepo.response(tile);
  }
}
