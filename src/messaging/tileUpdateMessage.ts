import TilePosition from "../domain/interfaces/tilePosition";

export interface TilePreparingAction {
  name: "preparing";
  position: TilePosition;
  value: boolean;
}

export interface TileWateringAction {
  name: "watering";
  position: TilePosition;
  value: boolean;
}

export interface TileUpdateMessage {
  type: "tile:update";
  tile: TilePosition;
  action: TilePreparingAction | TileWateringAction;
}
