import { FarmUpdateMessage } from "./farmUpdateMessage.ts";
import { TileUpdateMessageToUI } from "./tileChangeMessageToUI.ts";
import { TileUpdateMessage } from "./tileUpdateMessage.ts";

// handle message from UI to game system or service
export type GameReceiveMessage = TileUpdateMessage | FarmUpdateMessage;

// handle message from game system to UI
export type GameSendMessage = TileUpdateMessageToUI[];
