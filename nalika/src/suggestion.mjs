const electron = require('electron')
const path = require('path')
const Str = require('@supercharge/strings')
const { clipboard } = require('electron')
const remote = electron.remote

var str =document.getElementById('suggestion');

var s = Str.random(12)  

console.log(s)
str.innerHTML=s;

var next = document.getElementById("next")


next.addEventListener('click', function(event){
    location.reload();
})

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