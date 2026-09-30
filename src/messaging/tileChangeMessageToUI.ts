import TilePosition from "../domain/interfaces/tilePosition";

export interface TileUpdateMessageToUI {
  type: "tile";
  update: {
    position: TilePosition;
    state: {
      watered: boolean;
      prepared: boolean;
    };
  } | null;
}
