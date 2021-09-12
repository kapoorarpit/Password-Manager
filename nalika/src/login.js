const electron = require('electron')
const path = require('path')
const remote = electron.remote
const renderer = require('electron').ipcRenderer
const ipc = require('electron').ipcMain
const { ipcRenderer } = require('electron')


const submit = document.getElementById('summit')

submit.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('username').value);
    args.push(document.getElementById('password').value);
    renderer.send('login',args)
    console.log()
})

