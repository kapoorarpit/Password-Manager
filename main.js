const { app, BrowserWindow, Menu, ipcMain, dialog, BrowserWindowProxy, ipcRenderer } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const sqlite3 = require('sqlite3').verbose();
const renderer = require('electron').ipcRenderer
var fs = require('fs'); 
const { clipboard } = require('electron')

//create window-----------------------------------------------------------------------

var user_table
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
//create window ends-----------------------------------------------------------------------


//dialog boxes-----------------------------------------------------------------------------
ipcMain.on('Retry-password-check', function(event){
  dialog.showErrorBox('Password not matching','Please try again')
})

ipcMain.on('No-null-allowed', function(event){
  dialog.showErrorBox('Null value not allowed','Please try again')
})

ipcMain.on('navigate-login', function(){
mainWindow.loadFile('./nalika/login.html')
})

ipcMain.on('spaces_not_allowed', function(event){
  dialog.showErrorBox('Please try again','White spaces are not allowed in username and password')
})

ipcMain.on('too_small', function(event){
  dialog.showErrorBox('Please try again','Password must be at least 8 characters long')
})

ipcMain.on('Numbers not allowed', function(event){
  dialog.showErrorBox('Please try again','Numbers are not allowed in username')
})

ipcMain.on('password-detail', function(event,args){
  dialog.showMessageBox(null,{
    title: 'Your password copied to clipboard',
    message: args,
    details : "Password copied to clipboard",
    frame: false,
  }, clipboard.writeText(args))
})

ipcMain.on('display-strength', function(event,args){
  console.log(args)
  var s= checkpassword(args[0],args[1])
  var f = s.toString()+" out of 100"
  dialog.showMessageBox(null,{
    title: "Strength",
    detail: "is the strenght of currently entered password",
    message: f,
    frame: false
  })
})
//dialog boxes ends-----------------------------------------------------------------------------


//db section starts-------------------------------------------------------------------------------------------------
var db = new sqlite3.Database(__dirname + '/app.db');

// login starts...........................................--------------------
ipcMain.on('login', function(event,args){
  console.log("Login")
  var query = "SELECT name FROM user WHERE name = '" + args[0]+"'";
  var q=1
  db.get(query,(err,rows)=>{
    if(err){
      console.log(err)
      dialog.showErrorBox('No Entry Found','Please register first')
      return
    }
    else {
      if(rows==null){
      dialog.showErrorBox('No Entry Found','Please register first')
      q=2
      return
    }
    }
  })
  if(q==2){
  return}
  var query = "SELECT password FROM user WHERE name = '" + args[0]+"'";
  db.get(query,(err,rows)=>{
    if(err){
      console.log(err)
      return
    }
    else if(rows!=null){
      if(rows.password!=args[1]){
      console.log(rows.name)
      console.log(args[0])
      dialog.showErrorBox('Password not matching','Please try again')}
      else{
        let modalPath= path.join(__dirname,'./nalika/index.html')
        mainWindow.loadFile(modalPath)
      }
    }
  })
  user_table=args[0]+"_entries"
  var data_query='select * from '+user_table
  db.all(data_query,function(err,rows){
  if(err)
  {
    console.log(err)
  }
  else
  {
    console.log(rows)
    fs.writeFile("local-storage.txt",JSON.stringify(rows), (err) => {
      if(err){
          alert("An error ocurred creating the file "+ err)
      }
                  
      console.log("The file has been succesfully saved");
  });
  } 
  })
  console.log(args)
})
// login ends-----------------------------------------------------------------------------------


// register starts--------------------------------------------------------- --------------------
ipcMain.on('register', function(event,args){
//databse -----------------
var check_register=0

db.run('CREATE TABLE IF NOT EXISTS user(name TEXT PRIMARY KEY,password TEXT NOT NULL)',function(err){
  if(err){
    console.log(err)
    return
  }


db.run('INSERT INTO user(name, password) VALUES(?, ?)', [args[0],args[1]], (err) => {
    if(err) {
      dialog.showErrorBox("user name taken","please try again")
      check_register=1
      return console.log(err.message); 
    }
  })
})
if(check_register==1){
return}
console.log("166")
//check query
var query="CREATE TABLE IF NOT EXISTS "+args[0]+"_entries(entry TEXT PRIMARY KEY,password TEXT NOT NULL, strength INT NOT NULL)"
db.run(query,function(err){
  if(err){
    console.log(err)
    return
  }
})
  console.log(args)
  //naviagate
  let modalPath= path.join(__dirname,'./nalika/src/navigate.html')
  let win = new BrowserWindow({
    width: 300, 
    height: 170 , 
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
  console.log("Line 145 'register' working")
})
// register ends-----------------------------------------------------------------------------


// add data to user table------------------------------------------------------------------
ipcMain.on("user-data",(event, args)=>{
  console.log(args);
  console.log(user_table)
  var password_strength=checkpassword(args[0],args[1])
  var query="INSERT INTO " + user_table+" VALUES('"+args[0]+"','"+args[1]+"',"+password_strength+")"
  db.run(query, function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with row`);
  });
  loginclone()
})

function loginclone(){
  var data_query='select * from '+user_table
  db.all(data_query,function(err,rows){
  if(err)
  {
    console.log(err)
  }
  else
  {
    console.log(rows)
    fs.writeFile("local-storage.txt",JSON.stringify(rows), (err) => {
      if(err){
          alert("An error ocurred creating the file "+ err)
      }
                  
      console.log("The file has been succesfully saved");
  });
  } 
  })
  let modalPath= path.join(__dirname,'./nalika/index.html')
  mainWindow.loadFile(modalPath)
}

// add data to user table ends------------------------------------------------------------------


//checks all the tables
db.serialize(function () {
  db.all("select name from sqlite_master where type='table'", function (err, tables) {
      console.log(tables);
  });
})


/*
db.serialize(function() {

  db.all("SELECT * FROM arpit_entries", function(err, allRows) {

      if(err != null){
          console.log(err);
      }
      console.log(allRows)
  });
});



db.serialize(function() {
var query="DELETE FROM arpit_entries WHERE entry=''"
  db.all(query, function(err, allRows) {

      if(err != null){
          console.log(err);
      }
      console.log(allRows)
  });
});
*/

//(checks all the tables) ends--------------------------------------------------------------------
//db ends-----------------------------------------------------------------------------------------


//check password strength------------------------------------------------------------------------- 
function checkpassword(name, password) {
  var strength = 0;
  if (password.match(/[a-z]+/)) {
    strength += 3;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 3;
  }
  if (password.match(/[0-9]+/)) {
    strength += 3;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 3;

  }

  if(password.includes(name)){
    strength -=5;
  }
  if (password.length < 6) {
    strength -=3
  }


  if (password.length > 12) {
    strength +=5
  }

  if(strength<0)
  strength=0;
  if(strength>10)
  strength=10
  switch (strength) {
    case 0:
    case 1:
    case 2:
    case 3: 
      return 25;

    case 4:
    case 5:
    case 6:
      return 50;

    case 7:
    case 8:
    case 9:
        return 75;

    case 10:
        return 100;
  }
}

//check password strength ends------------------------------------------------------------------------- 