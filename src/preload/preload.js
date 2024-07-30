import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('customApi', {
    ping: () => ipcRenderer.invoke('ping')
});

contextBridge.exposeInMainWorld('expressApi', {
    hello: () => ipcRenderer.invoke('express-hello')
});
