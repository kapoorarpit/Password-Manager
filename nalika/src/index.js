const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow


window.onload=function(){
  const notifyBtn = document.getElementById('add111')
    notifyBtn.addEventListener('click', function (event) {
      console.log("this worked")


      const modalPath = path.join(__dirname+'/src/add.html')


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
}