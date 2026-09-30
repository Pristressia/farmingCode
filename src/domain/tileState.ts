import TilePosition from "./interfaces/tilePosition";

export default class TileState {
  prepared: boolean = false;
  watered: boolean = false;

  readonly x: number;
  readonly y: number;

  constructor(
    position: TilePosition,
    initState: {
      prepared: boolean;
      watered: boolean;
    },
  ) {
    this.x = position.x;
    this.y = position.y;

    this.prepared = initState.prepared;
    this.watered = initState.watered;
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
}
