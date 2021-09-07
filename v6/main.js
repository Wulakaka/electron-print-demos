const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const log = require('electron-log');
const AppUpdater = require('./update')

log.info('App starting...');

let win
const sendStatusToWindow = (text) => {
    log.info(text);
    win && win.webContents.send('message', text);
}
const appUpdater = new AppUpdater(sendStatusToWindow)
function createDefaultWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.webContents.openDevTools();
    win.on('closed', () => {
        win = null;
    });

    win.loadFile('index.html')
    return win
}

app.whenReady().then(() => {
    createDefaultWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createDefaultWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.on('print', e=> {
    e.sender.print({
        silent: true
    })
})

app.on('ready', function()  {
    appUpdater.checkForUpdatesAndNotify();
});
