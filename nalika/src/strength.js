const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote

var str =document.getElementById('data');

str.innerHTML="100";

const closeBtn = document.getElementById('close')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})