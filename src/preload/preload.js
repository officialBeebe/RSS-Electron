import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('customApi', {
    ping: () => ipcRenderer.invoke('ping')
})
