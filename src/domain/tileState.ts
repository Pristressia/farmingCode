import GameChangeLogger from "./gameChangeLogger.ts";
import { TileChange } from "./interfaces/gameChange";
import TilePosition from "./interfaces/tilePosition";

export default class TileState {
  private _prepared: boolean = false;
  private _watered: boolean = false;

  readonly x: number;
  readonly y: number;

  readonly changeLogger: GameChangeLogger;

  constructor(
    position: TilePosition,
    initState: {
      prepared: boolean;
      watered: boolean;
    },
    changeLogger: GameChangeLogger,
  ) {
    this.x = position.x;
    this.y = position.y;

    this.prepared = initState.prepared;
    this.watered = initState.watered;

    this.changeLogger = changeLogger;
  }

  private generateChangeLog(): TileChange {
    return {
      type: "tile",
      position: {
        x: this.x,
        y: this.y,
      },
      state: {
        prepared: this.prepared,
        watered: this.watered,
      },
    };
  }

  get position() {
    return { x: this.x, y: this.y };
  }

  get state() {
    return {
      watered: this.watered,
      prepared: this.prepared,
    };
  }

  get watered() {
    return this._watered;
  }

  /** @param {boolean} value */
  set watered(value) {
    this._watered = value;
    this.changeLogger.push(this.generateChangeLog());
  }

  get prepared() {
    return this._prepared;
  }

  /** @param {boolean} value */
  set prepared(value) {
    this._prepared = value;
    this.changeLogger.push(this.generateChangeLog());
  }
}
