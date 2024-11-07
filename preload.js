const { contextBridge, ipcRenderer, path } = require('electron');
console.log("LOG: hello from preload");

contextBridge.exposeInMainWorld('electronAPI', {

  doThing: () => ipcRenderer.send('do-a-thing'),

  getOrdersFrontend: () => ipcRenderer.invoke('dialog:getOrderChannel')

});