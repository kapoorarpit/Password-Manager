const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote
const {ipcRenderer} = electron;
const renderer = require('electron').ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow


const submit = document.getElementById('submit')

submit.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('password').value);
    args.push(document.getElementById('check-password').value);
    console.log("working")
    if(args[0].length<8){
        ipcRenderer.send("too_small")
        return;
    }
    if(args[0]==args[1])
    {
        ipcRenderer.send("changed-data",args[0])
        var window = remote.getCurrentWindow();
        window.close();}
    else
    {
        ipcRenderer.send('Retry-password-check')
    }
})

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const suggest = document.getElementById('suggest')

suggest.addEventListener('click', function (event) {
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


const strength = document.getElementById('strength1')

strength.addEventListener('click',function(event){
    var args = [];
    args.push("")
    args.push(document.getElementById('password').value);
    renderer.send("display-strength",args)
})