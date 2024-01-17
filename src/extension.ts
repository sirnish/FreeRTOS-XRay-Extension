// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
    let launchCLI = vscode.commands.registerCommand('freertos-xray.launchCLI', async() => {
        const terminal = vscode.window.createTerminal("FreeRTOS X-Ray");
        const path = _getPath('cli.exe')
        terminal.sendText(path, true);
        terminal.show();
    });

    let launchGUI = vscode.commands.registerCommand('freertos-xray.launchGUI', async() => {
        var exec = require('child_process').execFile;
        const terminal = vscode.window.createTerminal("FreeRTOS X-Ray");
        const path = _getPath('gui.exe')
        exec(path, function(err: any) {
            if(err) {
                console.log(err)
            }
        });
    });

    let launchExtension = vscode.commands.registerCommand('freertos-xray.launchExtension', async() => {

        const CLI_button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)
        CLI_button.text = 'FreeRTOS X-Ray CLI'
        CLI_button.tooltip = 'Connect to FreeRTOS deubugger CLI'
        CLI_button.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        CLI_button.command = 'freertos-xray.launchCLI'
        
        const GUI_button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right)
        GUI_button.text = 'FreeRTOS X-Ray GUI'
        GUI_button.tooltip = 'Connect to FreeRTOS deubugger GUI'
        GUI_button.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        GUI_button.command = 'freertos-xray.launchGUI'
        
        CLI_button.show()
        GUI_button.show()
    });

    context.subscriptions.push( launchCLI );
    context.subscriptions.push( launchGUI );
    context.subscriptions.push( launchExtension );

}

function _getPath(exe_path:string){
    let path_variables = __dirname.split('\\');
    path_variables.pop() //removing the 'out' folder from the path
    path_variables.push('binaries')
    path_variables.push(exe_path)
    let path = path_variables.join('/')
    return path;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate
};
