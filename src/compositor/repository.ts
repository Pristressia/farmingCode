import FarmState from "../domain/farmState.ts";
import GameChangeLogger from "../domain/gameChangeLogger.ts";
import WebViewMessageReceiver from "../repository/inbound/messageReceiver/webview-messageReceiver-repository.ts";
import TileUiRequestRepository from "../repository/inbound/tile/tile-UiRequest-repository.ts";
import TileToUIRepository from "../repository/outbound/tile/tile-toUiResponse-repository.ts";
import TileRepository from "../repository/outbound/tile/tile-toUiResponse-repository.ts";
import GameProgressionService from "../services/gameProgression.service.ts";
import TileManagementService from "../services/TileManagement.service.ts";
import { FARMSIZE } from "./constantConfig.ts";

//#region game state

export const changeLogger = new GameChangeLogger();

export const gameProgression = new GameProgressionService({
  farmSize: FARMSIZE,
  deps: {
    changeLogger: changeLogger,
  },
});

const farm = gameProgression.currentFarmState;

//#endregion

//#region game state change repo

//#endregion

//#region service or application core

const tileManagementService = new TileManagementService({
  farmState: farm,
});

//#endregion

//#region inbound

const tileUiRequestRepo = new TileUiRequestRepository({
  tileManagementService: tileManagementService,
});

export const messageReceiver = new WebViewMessageReceiver({
  tileUiRequestRepository: tileUiRequestRepo,
});

//#endregion
