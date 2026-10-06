
import TilePosition from "../domain/interfaces/tilePosition";
import TileState from "../domain/tileState.ts";
import { FarmUpdateMessage } from "./farmUpdateMessage.ts";
import { FarmUpdateMessageToUI } from "./farmUpdateMessageToUI.ts";
import { TileUpdateMessageToUI } from "./tileChangeMessageToUI.ts";
import { TileUpdateMessage } from "./tileUpdateMessage.ts";

// handle message from UI to game system or service
export type GameReceiveMessage = TileUpdateMessage | FarmUpdateMessage;

// handle message from game system to UI
export interface GamePatch {
    type: "patch";
    patch: (TileUpdateMessageToUI | FarmUpdateMessageToUI)[]}

export interface GameSnapshot {
    type: "snapshot";
    snapshot: {
        tile: {
            position: TilePosition;
            state: TileState; 
        }[][]
    }
}
export type GameSendMessage = GamePatch | ;
