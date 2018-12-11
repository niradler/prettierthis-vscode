// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
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
            console.log(getLang(editor.document.languageId))
            const {document} = editor;
            const firstLine = document.lineAt(0);
            console.log({firstLine})
            const text = editor.document.getText(editor.selection);
        console.log(text)
        const edit = new vscode.WorkspaceEdit();
        edit.insert(document.uri, firstLine.range.start, '42\n');
        console.log( ' firstLine.range.start',firstLine.range.start,document.uri)
        return vscode.workspace.applyEdit(edit)
        }
        
        
        // Display a message box to the user
        vscode.window.showInformationMessage('PrettierThis run complete!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;