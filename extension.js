// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const prettier = require("prettier");
const editor = vscode.window.activeTextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "PrettierThis" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.prettierthis', async function () {
        // The code you place here will be executed every time your command is executed
        try {
            const langs = [{lang:'javascript',ext:"js"}] ;
            const getLang = (languageId) => langs.filter(l=>languageId.includes(l.lang))[0];
            if (editor) {

                const {document} = editor;
                const lang = getLang(document.languageId);
                console.log(lang)
                const selection_range = editor["_selections"][0];
                const text = document.getText(editor.selection);
                let opts;
                try {
                    const filepath = document.isUntitled
                        ? (
                            vscode.workspace.workspaceFolders &&
                            vscode.workspace.workspaceFolders.length
                        )
                            ? vscode.workspace.workspaceFolders[0].uri.fsPath
                            : process.cwd()
                        : document.fileName;
                    opts = await prettier.resolveConfig(filepath) || {};
                } catch ( err ) {
                    opts = {};
                }
                const formated = prettier.format(text, opts);
                const edit = new vscode.WorkspaceEdit();
                edit.replace(document.uri, selection_range, formated);
                vscode.window.showInformationMessage('PrettierThis run complete!');
    
                return vscode
                    .workspace
                    .applyEdit(edit);
            }
        } catch (error) {
            vscode.window.showInformationMessage('PrettierThis: ' + error.message);
        }

    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;