import { SeasonEnum } from "../enums/seasonEnum.ts";
import TilePosition from "./tilePosition";

export type GameChange = TileChange | FarmChange;

export interface TileChange {
  type: "tile";
  position: TilePosition;
  state: {
    watered: boolean;
    prepared: boolean;
  };
}

export interface FarmChange {
  type: "farm";
  season: SeasonEnum;
}
