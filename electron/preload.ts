import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('cloudhop', {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
  },
  // Example: future channels
  // emotion: {
  //   snapshot: (payload) => ipcRenderer.invoke('emotion:snapshot', payload),
  // },
});
