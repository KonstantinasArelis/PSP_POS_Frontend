const { contextBridge, ipcRenderer, path } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {

  doThing: () => ipcRenderer.send('do-a-thing'),

  getOrdersFrontend: () => ipcRenderer.invoke('dialog:getOrderChannel')

});