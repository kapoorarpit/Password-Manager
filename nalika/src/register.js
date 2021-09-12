const electron = require('electron')
const path = require('path')
const remote = electron.remote
const renderer = require('electron').ipcRenderer


const submit = document.getElementById('submit')

submit.addEventListener('click',function(event){
    var args = [];
    args.push(document.getElementById('username').value);
    args.push(document.getElementById('password').value);
    args.push(document.getElementById('password-again').value);
    console.log("working")

    if(check_username(args[0]))
    {renderer.send('spaces_not_allowed');return;} 

    if(check_username(args[1]))
    {renderer.send('spaces_not_allowed');return;} 

    if(check_password(args[1]))
    {renderer.send('too_small');return;} 

    /*if(hasNumber(args[1]))
    {renderer.send('Numbers not allowed');return;} */

    if(args[1]!=args[2]){
        renderer.send('Retry-password-check')
    }
    else if(args[0]=="" || args[1]=="" || args[2]=="" ){
        renderer.send('No-null-allowed')
    }
    else
    {
        renderer.send("register",args)
    }
})


function check_username(str){
if(str.indexOf(' ') >= 0){
    return true;
}
return false;
}

function hasNumber(myString) {
    return /\d/.test(myString);
}

function check_password(pass){
    if(pass.length<8)
    {return true;}
    return false;
}