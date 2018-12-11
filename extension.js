// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const prettier = require("prettier");
const editor = vscode.window.activeTextEditor;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const langs = [{lang:'javascript',ext:"js"}] ;
const getLang = (languageId) => langs.filter(l=>languageId.includes(l.lang))[0];
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "PrettierThis" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('extension.prettierthis', function () {
        // The code you place here will be executed every time your command is executed
        if (editor) {

            const {document} = editor;
            const lang = getLang(document.languageId);
            console.log(lang)
            const selection_range = editor["_selections"][0];
            const text = document.getText(editor.selection);
            const formated = prettier.format(text, {});
            const edit = new vscode.WorkspaceEdit();
            edit.replace(document.uri, selection_range, formated);
            vscode.window.showInformationMessage('PrettierThis run complete!');

            return vscode
                .workspace
                .applyEdit(edit);
        }
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;