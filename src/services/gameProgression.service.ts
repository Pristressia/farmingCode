import { DebugProtocolSource } from "vscode";
import FarmState from "../domain/farmState.ts";
import FarmSize from "../domain/interfaces/farmSize";
import { GameSendMessage } from "../messaging/gameMessage.ts";
import GameChangeLogger from "../domain/gameChangeLogger.ts";
import { TileUpdateMessage } from "../messaging/tileUpdateMessage.ts";
import { TileUpdateMessageToUI } from "../messaging/tileChangeMessageToUI.ts";

interface Deps {
  changeLogger: GameChangeLogger;
}

interface Params {
  deps: Deps;
  farmSize: FarmSize;
}

type GameEvent = GameSendMessage[];

export default class GameProgressionService {
  private farm: FarmState;
  private changeLogger: GameChangeLogger;
  private listeners: ((event: GameEvent) => void)[] = [];

  farmSize: FarmSize;
  constructor(params: Params) {
    const { farmSize, deps } = params;

    this.changeLogger = deps.changeLogger;

    this.farmSize = farmSize;

    this.farm = new FarmState({
      size: farmSize,
      deps: { changeLogger: this.changeLogger },
    });
  }

  reset() {
    this.farm = new FarmState({
      size: this.farmSize,
      deps: { changeLogger: this.changeLogger },
    });
  }

  advance() {}

  subscribe(listener: (event: GameEvent) => void) {
    this.listeners.push(listener);

    return () => {
      const index = this.listeners.indexOf(listener);

      if (index !== -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private emit(event: GameEvent) {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
  //use for report current game state
  tick() {
    const changeLog = this.changeLogger.flush();
    if (changeLog === null) {
      return;
    }

    const changeUiMessage: GameSendMessage[] = [];

    for (const log of changeLog.changes ?? []) {
      switch (log.type) {
        case "tile": {
          const toUiChangeLog: TileUpdateMessageToUI = {
            type: "tile",
            update: {
              position: {
                x: log.position.x,
                y: log.position.y,
              },
              state: {
                prepared: log.state.prepared,
                watered: log.state.watered,
              },
            },
          };

          changeUiMessage.push(toUiChangeLog);
        }
        default:
          continue;
      }
    }

    return this.emit(changeUiMessage);
  }

  get currentFarmState() {
    return this.farm;
  }
}
