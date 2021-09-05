const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote
const {ipcRenderer} = electron;


var len=12
var str =document.getElementById('suggestion');

var s = Str.random(len)  

console.log(s)
str.innerHTML=s;

var set_len = document.getElementById("set_len")

set_len.addEventListener('click', function(event){
    var text = document.getElementById('length').value;
    var str =document.getElementById('suggestion');

    len = parseInt(text, 10);
    var s = Str.random(len)  

    console.log(s)
    str.innerHTML=s;
    //location.reload();
})

/*
var next = document.getElementById("next")


next.addEventListener('click', function(event){
    location.reload();
})
*/

var copy = document.getElementById("copy")

copy.addEventListener('click', function(event){
    var text = document.getElementById('suggestion');
    var copytext = text.innerHTML
    clipboard.writeText(copytext);
})

const closeBtn = document.getElementById('closeBtn')

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})