import { contextBridge } from 'electron'

contextBridge.exposeInMainWorld('cloudhop', {
  // Add secure APIs here later
})
