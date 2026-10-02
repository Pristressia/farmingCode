import fs from "fs";
import * as vscode from "vscode";

import { gameProgression, messageReceiver } from "./compositor/repository.ts";
import { GameReceiveMessage } from "./messaging/gameMessage.ts";

export class FarmViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = "farmingCode.farmView";

  constructor(private readonly extensionUri: vscode.Uri) {}

  resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    token: vscode.CancellationToken,
  ): Thenable<void> | void {
    console.log("🌱 FARM VIEW RESOLVING");

    const webview = webviewView.webview;

    webviewView.webview.options = {
      enableScripts: true,

      localResourceRoots: [
        vscode.Uri.joinPath(this.extensionUri, "dist", "html"),
      ],
    };

    webviewView.webview.html = this.getHtml(webview);
    webviewView.webview.onDidReceiveMessage((message: GameReceiveMessage) => {
      this.handleMessage(message);
    });

    gameProgression.subscribe((event) => {
      this.pushMessageToUi(webviewView, event);
    });

    console.log("🌱 FARM HTML ASSIGNED");
  }

  //#region create & generate farm view inside panel zone
  private getExtensionPath(dirName: string, fileName: string) {
    return vscode.Uri.joinPath(this.extensionUri, "dist", dirName, fileName);
  }

  private getResourceUri(
    webview: vscode.Webview,
    dirName: string,
    fileName: string,
  ) {
    const path = this.getExtensionPath(dirName, fileName);
    return webview.asWebviewUri(path);
  }

  private getHtml(webview: vscode.Webview) {
    const htmlPath = this.getExtensionPath("html", "farm.html");
    const html = fs.readFileSync(htmlPath.fsPath, "utf8");

    const cssUri = this.getResourceUri(webview, "html", "farm.css");
    const jsUri = this.getResourceUri(webview, "html", "farm.js");

    return html
      .replace("./farm.css", cssUri.toString())
      .replace("./farm.js", jsUri.toString());
  }
  //#endregion

  private handleMessage(message: GameReceiveMessage) {
    messageReceiver.receive(message);
  }

  private pushMessageToUi(webviewView: vscode.WebviewView, message: object) {
    return webviewView.webview.postMessage(message);
  }
}
