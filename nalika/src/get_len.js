const electron = require('electron')
const path = require('path')
const remote = electron.remote
const renderer = require('electron').ipcRenderer
const BrowserWindow = electron.remote.BrowserWindow
const Str = require('@supercharge/strings')


const submit = document.getElementById('submit')


var len;

submit.addEventListener('click',function(event){
      len = document.getElementById('length').value;
      var window = remote.getCurrentWindow();
      window.close();
})

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})


    /*
    let modalPath= path.join(__dirname,'suggestion.html')
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
      */
