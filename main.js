const { app, BrowserWindow, ipcMain } = require('electron/main'); // Import ipcMain
const path = require('path'); // Import the path module
const axios = require('axios')

console.log("LOG: starting dabar")

ipcMain.on('get-test-string', async (event) => {
  console.log("LOG: main.js is trying to work");
  try {
    //order?employee_id=123&min_total_amount=50&max_total_amount=100&order_status=OPEN&page_nr=1&limit=25
    const response = await axios.get('http://localhost:5274/order?employee_id=123&min_total_amount=50&max_total_amount=1000&order_status=OPEN&page_nr=0&limit=25');
    event.reply('test-string-data', response.data); 
  } catch (error) {http://localhost:5274/order
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

  win.loadFile('react-app/public/index.html')
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