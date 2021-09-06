const { app, BrowserWindow, Menu, ipcMain, dialog, BrowserWindowProxy, ipcRenderer } = require('electron')
const path = require('path')
const url = require('url')
const shell = require('electron').shell
const sqlite3 = require('sqlite3').verbose();
const renderer = require('electron').ipcRenderer


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


//Create databse
/*
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});*/


//db-------------------------------------------------------------------------------------------------
var db = new sqlite3.Database(__dirname + '/app.db');


//section ends------------------------------------------------------------------------------------------------
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














// login --------------------

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
  console.log(args)
  event.reply('login', 'pong')
})





// register --------------------
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
  console.log("Line 145 'register' working")
})


//checks all the tables

db.serialize(function () {
  db.all("select name from sqlite_master where type='table'", function (err, tables) {
      console.log(tables);
  });
})


/*
db.serialize(function() {

  db.all("SELECT * FROM user", function(err, allRows) {

      if(err != null){
          console.log(err);
      }
      console.log(allRows)
  });
});

db.serialize(function() {
var query="SELECT * FROM "+user_table
  db.all(query, function(err, allRows) {

      if(err != null){
          console.log(err);
      }
      console.log(allRows)
  });
});

var data
var data_query='select * from arpit_entries'
db.get(data_query,function(err,rows){
  if(err)
  {
    console.log(err)
  }
  else
  {
    console.log(rows)
    data = rows
  }
})
*/



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
  if(name.match(password)){
    return 0
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



  /*
  var master = document.getElementById("master")
  var newdiv= document.createElement("div")
  console.log("div created")
  newdiv.className = "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  var div1=document.createElement("div")
  div1.className = "admin-content analysis-progrebar-ctn res-mg-t-15"
  var h1 = document.createElement('h4');
  h1.className = 'text-left text-uppercase'
  h1.textContent = 'Sample';
  var div2=document.createElement("div")
  div2.className = "admin-content analysis-progrebar-ctn res-mg-t-15"
  var div3= document.createElement("div")
  div3.className = "colvertical-center-box vertical-center-box-tablet"
  var div4= document.createElement("div")
  div4.className = "row-xs-1 mar-bot-15 text-left"
  var div5= document.createElement("div")
  div5.className = "row-xs-1 cus-gh-hd-pro"
  var h2 = document.createElement("h2")
  h2.className = "text-right no-margin"
  h2.textContent = "Strength"
  var div6= document.createElement("div")
  div6.className = "progress progress-mini"
  var div7 = document.createElement("div")
  div7.className ="progress-bar bg-green"
  div7.style = "width: 100%;"
  button1 = document.createElement("button")
  button1.textContent = "view"
  button2 = document.createElement("button")
  button2.textContent = "reset"
  div4.appendChild(button1)
  div4.appendChild(button2)
  div6.appendChild(div7)
  div3.appendChild(div4)
  div5.appendChild(h2)
  div3.appendChild(div5)
  div2.appendChild(h1)
  div2.appendChild(div3)
  div2.appendChild(div6)
  div1.appendChild(div2)
  newdiv.appendChild(div1)
  master.appendChild(newdiv)*/