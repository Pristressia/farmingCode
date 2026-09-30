import FarmState from "../domain/farmState.ts";
import WebViewMessageReceiver from "../repository/inbound/messageReceiver/webview-messageReceiver-repository.ts";
import TileUiRequestRepository from "../repository/inbound/tile/tile-UiRequest-repository.ts";
import TileToUIRepository from "../repository/outbound/tile/tile-toUiResponse-repository.ts";
import TileRepository from "../repository/outbound/tile/tile-toUiResponse-repository.ts";
import TileManagementService from "../services/TileManagement.service.ts";
import { FARMSIZE } from "./constantConfig.ts";

//#region game state
const farmState = new FarmState(FARMSIZE);

//#endregion

//#region outbound adapter to webview
const tileToUIRepo = new TileToUIRepository();
//#endregion

//#region game state change repo
const tileRepo = new TileRepository({
  farmState: farmState,
  TileToUIRepository,
});

//#endregion

//#region service or application core

const tileManagementService = new TileManagementService({
  farmState: farmState,
});

//#endregion

//#region inbound
const tileUiRequestRepo = new TileUiRequestRepository({
  tileManagementService: tileManagementService,
  tileToUIReponseRepo: tileToUIRepo,
});

const messageReceiver = new WebViewMessageReceiver({
  tileUiRequestRepository: tile,
});

//#endregion
