const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote
const renderer = require('electron').ipcRenderer

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})

const login = document.getElementById('login')

login.addEventListener('click', function (event) {
    renderer.send('navigate-login')
    var window = remote.getCurrentWindow();
    window.close();
})