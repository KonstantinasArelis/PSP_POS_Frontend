**This repository is the frontend part of a Point-Of-Sale system. It uses Electron with React.**

1. Install node.js
2. Clone the repo
3. inside the repo folder do:
    npm install --save-dev electron
    npm install axios

You might want to add these configurations (VScode): 
```
"configurations": [
  {
    "name": "Renderer",
    "port": 9222,
    "request": "attach",
    "type": "chrome",
    "webRoot": "<span class="math-inline">\{workspaceFolder\}"
\},
\{
"name"\: "Main",
"type"\: "node",
"request"\: "launch",
"cwd"\: "</span>{workspaceFolder}",
    "runtimeExecutable": "<span class="math-inline">\{workspaceFolder\}/node\_modules/\.bin/electron",
"windows"\: \{
"runtimeExecutable"\: "</span>{workspaceFolder}/node_modules/.bin/electron.cmd"
    },
    "args": [".", "--remote-debugging-port=9222"],
    "outputCapture": "std",
    "console": "integratedTerminal"
  }
]
```

To launch the electron desktop app:
1. start the backend
2. do ``` npm start ``` at /react-app
3. then start the electron app main + renderer (preferably through the configurations above)

More info at:
https://www.electronjs.org/docs/latest/tutorial/tutorial-first-app
