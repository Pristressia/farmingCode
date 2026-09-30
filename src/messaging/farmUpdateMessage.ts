import { SeasonEnum } from "../domain/enums/seasonEnum.ts";

export interface FarmUpdateSeason {
  name: "updateSeason";
  value: SeasonEnum;
}

export interface FarmUpdateMessage {
  type: "farm:update";
  action: FarmUpdateSeason;
}
