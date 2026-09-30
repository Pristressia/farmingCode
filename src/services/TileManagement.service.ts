import FarmState from "../domain/farmState.ts";
import TilePosition from "../domain/interfaces/tilePosition";
import TileState from "../domain/tileState.ts";

interface Deps {
  farmState: FarmState;
}

export default class TileManagementService {
  readonly farm: FarmState;

  constructor(deps: Deps) {
    this.farm = deps.farmState;
  }

  getTile(position: TilePosition): TileState | null {
    return this.farm.tilesMap?.[position.y]?.[position.x] ?? null;
  }

  prepareTile(position: TilePosition): TileState | null {
    const tile = this.farm.getTile(position);
    if (!tile) {
      return null;
    }

    tile.prepared = true;

    return tile;
  }

  waterTile(position: TilePosition): TileState | null {
    const tile = this.farm.getTile(position);
    if (!tile) {
      return null;
    }
    return tile;
  }
}
