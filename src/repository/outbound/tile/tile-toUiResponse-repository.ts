import FarmState from "../../../domain/farmState.ts";
import TilePosition from "../../../domain/interfaces/tilePosition";
import TileState from "../../../domain/tileState.ts";
import { TileUpdateMessageToUI } from "../../../messaging/tileChangeMessageToUI.ts";
import type { TileUpdateMessage } from "../../../messaging/tileUpdateMessage.ts";

interface Deps {
  farmState: FarmState;
}

export default class TileToUIRepository {
  response(tile: TileState | null): TileUpdateMessageToUI {
    if (!tile) {
      return { type: "tile", update: null };
    }

    return {
      type: "tile",
      update: {
        position: tile.position,
        state: tile.state,
      },
    };
  }
}
