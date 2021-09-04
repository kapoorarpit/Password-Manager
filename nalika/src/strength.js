const suggession = document.getElementById('suggest')

suggession.addEventListener('click',function(event){
    console.log("suggest")
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
      win.on('close', function () { win = null })
      win.loadFile(modalPath);
      win.show()
})