This repository is the frontend part of a Point-Of-Sale system. It uses Electron with React.

1. Install node.js
2. Clone the repo
3. inside the repo folder do:
    npm install --save-dev electron
    npm install axios

You might want to add these configurations (vscode): 
    ''' 
"configurations": [
            {
                "name": "Renderer",
                "port": 9222,
                "request": "attach",
                "type": "chrome",
                "webRoot": "${workspaceFolder}"
            },
            {
                "name": "Main",
                "type": "node",
                "request": "launch",
                "cwd": "${workspaceFolder}",
                "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
                "windows": {
                "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
                },
                "args": [".", "--remote-debugging-port=9222"],
                "outputCapture": "std",
                "console": "integratedTerminal"
            }
            ] 
'''

More info at:
https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app