"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __importStar(require("vscode"));
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    let launchCLI = vscode.commands.registerCommand('freertos-xray.launchCLI', async () => {
        const terminal = vscode.window.createTerminal("FreeRTOS X-Ray");
        const path = _getPath('cli.exe');
        terminal.sendText(path, true);
        terminal.show();
    });
    let launchGUI = vscode.commands.registerCommand('freertos-xray.launchGUI', async () => {
        var exec = require('child_process').execFile;
        const terminal = vscode.window.createTerminal("FreeRTOS X-Ray");
        const path = _getPath('gui.exe');
        exec(path, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
    let launchExtension = vscode.commands.registerCommand('freertos-xray.launchExtension', async () => {
        const CLI_button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        CLI_button.text = 'FreeRTOS X-Ray CLI';
        CLI_button.tooltip = 'Connect to FreeRTOS deubugger CLI';
        CLI_button.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        CLI_button.command = 'freertos-xray.launchCLI';
        const GUI_button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right);
        GUI_button.text = 'FreeRTOS X-Ray GUI';
        GUI_button.tooltip = 'Connect to FreeRTOS deubugger GUI';
        GUI_button.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        GUI_button.command = 'freertos-xray.launchGUI';
        CLI_button.show();
        GUI_button.show();
    });
    context.subscriptions.push(launchCLI);
    context.subscriptions.push(launchGUI);
    context.subscriptions.push(launchExtension);
}
exports.activate = activate;
function _getPath(exe_path) {
    let path_variables = __dirname.split('\\');
    path_variables.pop(); //removing the 'out' folder from the path
    path_variables.push('binaries');
    path_variables.push(exe_path);
    let path = path_variables.join('/');
    return path;
}
// This method is called when your extension is deactivated
function deactivate() { }
module.exports = {
    activate,
    deactivate
};
//# sourceMappingURL=extension.js.map