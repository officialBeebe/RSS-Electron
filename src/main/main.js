// eslint-disable-next-line no-undef
require('dotenv').config();

/* eslint-disable no-undef */
import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
const axios = require('axios');

function createWindow() {
    let mainWindow = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, '../preload/preload.js'),
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    ipcMain.handle('ping', () => 'pong');

    // Vite dev server URL
    mainWindow.loadURL('http://localhost:5173');

    // DevTools
    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createWindow();

    // Express API call
    ipcMain.handle('express-hello', async () => {
        try {
            const response = await axios.get('http://localhost:5069/');
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error);
            return { error: 'Failed to fetch data' };
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
