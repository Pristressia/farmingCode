import FarmState from "./farmState.ts";
import FarmSize from "./interfaces/farmSize";
import TilePosition from "./interfaces/tilePosition";
import TileState from "./tileState.ts";

export function createFarm(size: FarmSize) {
  return new FarmState(size);
}

export function getTile(
  farm: FarmState,
  position: TilePosition,
): TileState | null {
  return farm.tilesMap?.[position.y]?.[position.x] ?? null;
}

export function prepareField(farm: FarmState, position: TilePosition): boolean {
  const tile = getTile(farm, position);

  if (!tile) {
    return false;
  }

  tile.prepared = true;

  return true;
}

export function waterField(farm: FarmState, position: TilePosition): boolean {
  const tile = getTile(farm, position);

  if (!tile || !tile.prepared) {
    return false;
  }

  tile.watered = true;

  return true;
}
