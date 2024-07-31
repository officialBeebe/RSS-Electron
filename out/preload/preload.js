"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  rss: () => electron.ipcRenderer.invoke("get-feeds")
});
electron.contextBridge.exposeInMainWorld("electron", {
  openExternal: (url) => electron.ipcRenderer.invoke("open-external-url", url)
});
