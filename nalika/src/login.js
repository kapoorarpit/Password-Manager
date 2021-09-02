const electron = require('electron')
const path = require('path')
const remote = electron.remote
const renderer = require('electron').ipcRenderer


const submit = document.getElementById('submit')

submit.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('username').value);
    args.push(document.getElementById('password').value);
    console.log("working")
    renderer.send('login',args)
})
