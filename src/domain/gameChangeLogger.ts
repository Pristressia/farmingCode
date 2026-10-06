import { GameSendMessage } from "../messaging/gameMessage.ts";
import { GameChange } from "./interfaces/gameChange";

/**
 * @abstract we need to inject this into any domain for getting change from any domain
 *  * farm
 *  * tile
 *  * crop
 *  * another tools in farm later
 */
export default class GameChangeLogger {
  private pending: GameChange[] = [];
  private _version: number = 0;
  constructor() {}

  push(log: GameChange) {
    this.pending.push(log);
  }

  get version() {
    return this._version;
  }

  flush(): { version: number; changes: GameChange[] } | null {
    if (this.pending.length === 0) {
      return null;
    }

    const changes = [...this.pending];
    this.pending = [];
    return { version: ++this._version, changes };
  }
}
