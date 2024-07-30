import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('customApi', {
    ping: () => ipcRenderer.invoke('ping')
});

contextBridge.exposeInMainWorld('expressApi', {
    hello: () => ipcRenderer.invoke('express-hello'),
    rss: () => ipcRenderer.invoke('express-rss-feeds'),
});

contextBridge.exposeInMainWorld('electron', {
    openExternal: (url) => ipcRenderer.invoke('open-external-url', url)
});