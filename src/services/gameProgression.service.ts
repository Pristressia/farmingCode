import FarmState from "../domain/farmState.ts";

interface Deps {
  farmState: FarmState;
}

export default class GameProgressionService {
  private farm: FarmState;
  constructor(deps: Deps) {
    this.farm = deps.farmState;
  }
}
