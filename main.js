const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain

function createWindow () {

  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      webSecurity: false
    },
  }) 
  mainWindow.loadFile('./nalika/index.html')
}


ipcMain.on("user-data",(event, arg)=>{
  console.log(arg);
})
app.on('ready', createWindow)

ipcMain.on('Retry-password-check', function(event){
  dialog.showErrorBox('Password not matching','Please retry')
})