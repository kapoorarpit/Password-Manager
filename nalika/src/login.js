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

ipcRenderer.on('reply',(event, args)=>{
    window.console.log("line 19")
    console.log(args)
    data_update()
})

function data_update(){
  var master = document.getElementById("master")
  var newdiv= document.createElement("div")
  console.log("div created")
  newdiv.className = "col-lg-3 col-md-3 col-sm-3 col-xs-12"
  var div1=document.createElement("div")
  div1.className = "admin-content analysis-progrebar-ctn res-mg-t-15"
  var h1 = document.createElement('h4');
  h1.className = 'text-left text-uppercase'
  h1.textContent = 'Sample';
  var div2=document.createElement("div")
  div2.className = "admin-content analysis-progrebar-ctn res-mg-t-15"
  var div3= document.createElement("div")
  div3.className = "colvertical-center-box vertical-center-box-tablet"
  var div4= document.createElement("div")
  div4.className = "row-xs-1 mar-bot-15 text-left"
  var div5= document.createElement("div")
  div5.className = "row-xs-1 cus-gh-hd-pro"
  var h2 = document.createElement("h2")
  h2.className = "text-right no-margin"
  h2.textContent = "Strength"
  var div6= document.createElement("div")
  div6.className = "progress progress-mini"
  var div7 = document.createElement("div")
  div7.className ="progress-bar bg-green"
  div7.style = "width: 100%;"
  button1 = document.createElement("button")
  button1.textContent = "view"
  button2 = document.createElement("button")
  button2.textContent = "reset"
  div4.appendChild(button1)
  div4.appendChild(button2)
  div6.appendChild(div7)
  div3.appendChild(div4)
  div5.appendChild(h2)
  div3.appendChild(div5)
  div2.appendChild(h1)
  div2.appendChild(div3)
  div2.appendChild(div6)
  div1.appendChild(div2)
  newdiv.appendChild(div1)
  master.appendChild(newdiv)
}