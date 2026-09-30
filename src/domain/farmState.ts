import { SeasonEnum } from "./enums/seasonEnum.ts";
import FarmSize from "./interfaces/farmSize";
import TilePosition from "./interfaces/tilePosition";
import TileState from "./tileState.ts";

export default class FarmState {
  readonly columns: number;
  readonly rows: number;

  season: SeasonEnum = SeasonEnum.SUMMER;

  /** @abstract เป็น array 2 มิติ โดยมี รูปแบบ [[tile1-1, tile2-1, tile3-1], [tile1-2, tile2-2, tile3-2]] */
  readonly tilesMap: TileState[][];

  private randomGenerateTilesMap(size: FarmSize) {
    const tilesMap: TileState[][] = [];
    for (let y = 0; y < size.rows; y++) {
      const row: TileState[] = [];
      for (let x = 0; x < size.columns; x++) {
        row.push(
          new TileState(
            { x, y },
            {
              prepared: false,
              watered: false,
            },
          ),
        );
      }
      tilesMap.push(row);
    }

    return tilesMap;
  }

  constructor(size: FarmSize, initialTilesMap?: TileState[][]) {
    this.columns = size.columns;
    this.rows = size.rows;

    if (initialTilesMap) {
      this.tilesMap = initialTilesMap;
    } else {
      this.tilesMap = this.randomGenerateTilesMap(size);
    }
  }

  getTile(position: TilePosition): TileState | null {
    return this.tilesMap?.[position.y]?.[position.x] ?? null;
  }
}
