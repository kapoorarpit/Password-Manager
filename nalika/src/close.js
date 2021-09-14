const electron = require('electron')
const path = require('path')
const remote = electron.remote
const renderer = require('electron').ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow



const suggession = document.getElementById('suggest')

suggession.addEventListener('click',function(event){
    console.log("suggest")
    let modalPath= path.join(__dirname,'suggestion.html')
    let win = new BrowserWindow({
        width: 450, 
        height: 300, 
        frame: false,   
        //alwaysOnTop: true,
         webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        webSecurity: false,
        transparent : true,
        hasShadow: true,
        resizable:false
      },})
      win.on('close', function () { win = null })
      win.loadFile(modalPath);
      win.show()
})

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const submit = document.getElementById('submit')

submit.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('name').value);
    args.push(document.getElementById('password').value);
    args.push(document.getElementById('check-password').value);
    args.push(100)
    console.log("working")
    if(args[1].length<8){
        renderer.send("too_small")
        return;
    }
    if(args[1]==args[2])
    {renderer.send("user-data",args);
    var window = remote.getCurrentWindow();
    window.close();}
    else
    {
        renderer.send('Retry-password-check')
    }
})


const strength = document.getElementById('strength1')

strength.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('name').value);
    args.push(document.getElementById('password').value);
    renderer.send("display-strength",args)
})


/*
strength.addEventListener('click',function(event){
    let modalPath= path.join(__dirname,'strength.html')
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
      win.webContents.openDevTools()
})
*/