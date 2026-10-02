import * as vscode from "vscode";

import { FarmViewProvider } from "./farmViewProvider.ts";

import { gameProgression } from "./compositor/repository.ts";

export function activate(context: vscode.ExtensionContext) {
  console.log("🌱 FARM EXTENSION ACTIVATED");
  const farmViewProvider = new FarmViewProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      FarmViewProvider.viewType,
      farmViewProvider,
    ),
  );
}
// export function activate(context: vscode.ExtensionContext) {
//   const provider = new FarmViewProvider(context.extensionUri);

//   context.subscriptions.push(
//     vscode.window.registerWebviewViewProvider(
//       FarmViewProvider.viewType,
//       provider,
//     ),
//   );
// }
