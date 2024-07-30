"use strict";
const electron = require("electron");
const path = require("path");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const path__namespace = /* @__PURE__ */ _interopNamespaceDefault(path);
require("dotenv").config();
const axios = require("axios");
function createWindow() {
  let mainWindow2 = new electron.BrowserWindow({
    webPreferences: {
      preload: path__namespace.join(__dirname, "../preload/preload.js"),
      contextIsolation: true,
      enableRemoteModule: false
    }
  });
  electron.ipcMain.handle("ping", () => "pong");
  mainWindow2.loadURL("http://localhost:5173");
  if (process.env.NODE_ENV === "development") {
    mainWindow2.webContents.openDevTools();
  }
  mainWindow2.on("closed", () => {
    mainWindow2 = null;
  });
}
electron.app.whenReady().then(() => {
  createWindow();
  electron.ipcMain.handle("express-hello", async () => {
    try {
      const response = await axios.get("http://localhost:5069/");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error: "Failed to fetch data" };
    }
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
