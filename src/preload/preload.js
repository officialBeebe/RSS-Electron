import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
    rss: () => ipcRenderer.invoke('get-feeds'),
});

contextBridge.exposeInMainWorld('electron', {
    openExternal: (url) => ipcRenderer.invoke('open-external-url', url)
});