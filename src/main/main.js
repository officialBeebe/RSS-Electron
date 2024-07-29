/* eslint-disable no-undef */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    ipcMain.handle('ping', () => 'pong');

    // Vite dev server URL
    // Vite DEV server URL
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.on('closed', () => mainWindow = null);

    // DevTools
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => mainWindow = null);
}

app.whenReady().then(() => {
    createWindow();
});

// macOS shit...
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow == null) {
        createWindow();
    }
});