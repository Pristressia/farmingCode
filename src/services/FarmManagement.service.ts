import { SeasonEnum } from "../domain/enums/seasonEnum.ts";
import FarmState from "../domain/farmState.ts";

interface Deps {
  farmState: FarmState;
}

export default class FarmManagementService {
  readonly farm: FarmState;
  constructor(deps: Deps) {
    this.farm = deps.farmState;
  }

  changeSeason(season: SeasonEnum) {
    this.farm.season = season;
  }
}
