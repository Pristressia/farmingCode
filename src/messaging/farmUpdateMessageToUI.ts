import { SeasonEnum } from "../domain/enums/seasonEnum.ts";

export interface FarmUpdateMessageToUI {
  type: "farm";
  update: {
    season: SeasonEnum;
  };
}
