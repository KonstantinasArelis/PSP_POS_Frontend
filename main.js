const { app, BrowserWindow, ipcMain } = require('electron/main'); // Import ipcMain
const path = require('path'); // Import the path module
const axios = require('axios')

console.log("LOG: starting dabar")

ipcMain.on('get-test-string', async (event) => {
  console.log("LOG: trying something:");
  try {
    const response = await axios.get('http://localhost:5274/order'); 
    event.reply('test-string-data', response.data); 
    console.log("LOG: response:" + response);
  } catch (error) {
    console.log("LOG: response:" + response);
    console.error('Error fetching data:', error);
    event.reply('test-string-error', error);
  }
});


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
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