const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain
const sqlite3 = require('sqlite3').verbose();

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
  mainWindow.loadFile('./nalika/login.html')
}

let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the in-memory SQlite database.');
});

/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/

ipcMain.on("user-data",(event, arg)=>{
  console.log(arg);
})
app.on('ready', createWindow)

ipcMain.on('Retry-password-check', function(event){
  dialog.showErrorBox('Password not matching','Please retry')
})

ipcMain.on('login', function(event,args){
  console.log(args)
})

ipcMain.on('register', function(event,args){
  console.log(args)
})