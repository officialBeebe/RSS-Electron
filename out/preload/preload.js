"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("customApi", {
  ping: () => electron.ipcRenderer.invoke("ping")
});
