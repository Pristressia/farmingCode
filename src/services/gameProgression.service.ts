import FarmState from "../domain/farmState.ts";
import FarmSize from "../domain/interfaces/farmSize";
import { GameSendMessage } from "../messaging/gameMessage.ts";

interface Params {
  farmSize: FarmSize;
}

type GameEvent = GameSendMessage;

export default class GameProgressionService {
  private farm: FarmState;
  private listeners: ((event: GameEvent) => void)[] = [];

  farmSize: FarmSize;
  constructor(params: Params) {
    this.farmSize = params.farmSize;

    this.farm = new FarmState(params.farmSize);
  }

  reset() {
    this.farm = new FarmState(this.farmSize);
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
    this.emit({
      type: "farm update",
    });
  }

  get currentFarmState() {
    return this.farm;
  }
}
