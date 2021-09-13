const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote
const {ipcRenderer} = electron;


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