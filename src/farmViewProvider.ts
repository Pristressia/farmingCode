import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as vscode from "vscode";

export class FarmViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "farmingCode.farmView";

  constructor(private readonly extensionUrl: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken,
  ): Thenable<void> | void {
    console.log("🌱 FARM VIEW RESOLVING");
    webviewView.webview.options = { enableScripts: true };

    webviewView.webview.html = this.getHtml();
    console.log("🌱 FARM HTML ASSIGNED");
  }

  private getHtml() {
    return fs.readFileSync(
      path.join(__dirname, "/html/mainDisplay.html"),
      "utf8",
    );
  }

  //   private getHtml() {
  //     return `<!doctype html>
  // <html lang="en">
  //   <head>
  //     <meta charset="UTF-8" />
  //     <meta
  //       name="viewport"
  //       content="width=device-width,
  //         initial-scale=1.0"
  //     />
  //     <title>Farm</title>
  //   </head>
  //   <body>
  //     <h1>🌱 My Farm</h1>
  //     <p>Welcome to the farm!</p>
  //   </body>
  // </html>
  // `;
  //   }
}
