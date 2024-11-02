const { app, BrowserWindow, ipcMain } = require('electron/main'); // Import ipcMain
const path = require('path'); // Import the path module
const axios = require('axios')

console.log("LOG: Logs from main.js appear here")

ipcMain.on('do-a-thing', (event) => {
  console.log('Received "do-a-thing" message from renderer process');
});

async function getOrders () {
  const response = await axios.get('http://localhost:5274/order?employee_id=123&min_total_amount=50&max_total_amount=1000&order_status=OPEN&page_nr=0&limit=25');
  return response.data;
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
      //sandbox: false // if nothing else works
    }
  })

  win.loadURL('http://localhost:3000');
}

app.whenReady().then(() => {
  ipcMain.handle('dialog:getOrderChannel', getOrders)
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})