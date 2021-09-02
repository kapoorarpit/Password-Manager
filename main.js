const { app, BrowserWindow, Menu, ipcMain, dialog, BrowserWindowProxy } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const ipc = require('electron').ipcMain
const sqlite3 = require('sqlite3').verbose();


var mainWindow
function createWindow () {

  mainWindow = new BrowserWindow({
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

app.on('ready', createWindow)


//Create databse
/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/


//Need a check-------------------------------------------------------------------------------------------------
var db = new sqlite3.Database(__dirname + '/app.db');
if(db==null){
  db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });
}

ipcMain.on("user-data",(event, arg)=>{
  console.log(arg);
})

ipcMain.on('Retry-password-check', function(event){
  dialog.showErrorBox('Password not matching','Please try again')
})

ipcMain.on('No-null-allowed', function(event){
  dialog.showErrorBox('Null value not allowed','Please try again')
})

ipcMain.on('navigate-login', function(){
mainWindow.loadFile('./nalika/login.html')
})
// login --------------------

ipcMain.on('login', function(event,args){
  console.log("Login")
  console.log(args)
})



// register --------------------
ipcMain.on('register', function(event,args){


//databse -----------------
db.run('CREATE TABLE IF NOT EXISTS user(name TEXT PRIMARY KEY,password TEXT NOT NULL)',function(err){
  if(err){
    console.log(err)
    return
  }
  db.run('INSERT INTO user(name, password) VALUES(?, ?)', [args[0],args[1]], (err) => {
    if(err) {
      return console.log(err.message); 
    }
  })
  console.log("register")
})
db.run('CREATE TABLE IF NOT EXISTS entries(entry TEXT PRIMARY KEY,password TEXT NOT NULL, strength INT NOT NULL)',function(err){
  if(err){
    console.log(err)
    return
  }
  console.log("register")
})
  console.log(args)
  //naviagate
  let modalPath= path.join(__dirname,'./nalika/src/navigate.html')
  let win = new BrowserWindow({
    width: 400, 
    height: 200 , 
    frame: false,   
    //alwaysOnTop: true,
     webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    webSecurity: false,
    transparent : true
  },})
  win.on('close', function () { win = null })
  win.loadFile(modalPath);
  win.show()
})

/*
db.run(`DROP TABLE user;`)
db.run(`DROP TABLE entries;`)
*/
//checks all the tables
db.serialize(function () {
  db.all("select name from sqlite_master where type='table'", function (err, tables) {
      console.log(tables);
  });
})