const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTestString: () => ipcRenderer.send('get-test-string'), 
  onTestStringData: (callback) => ipcRenderer.on('test-string-data', callback),
  onTestStringError: (callback) => ipcRenderer.on('test-string-error', callback)
});