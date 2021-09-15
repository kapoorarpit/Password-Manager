const { ipcRenderer } = require('electron');
var fs = require('fs')


async function render(){
      var user_data
      console.log(user_data = await read_data())
      for(i in user_data){
      var master = document.getElementById("master")
      var newdiv= document.createElement("div")
      console.log("div created")
      newdiv.className = "col-lg-3 row-md-3 row-sm-3 row-xs-12 row-mt-3 row-mb-3 row-xg-3"
      var div1=document.createElement("div")
      div1.className = "admin-content analysis-progrebar-ctn res-mg-t-15"
      var h1 = document.createElement('h4');
      h1.className = 'text-left text-uppercase'
      h1.textContent = user_data[i].entry
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
      h2.textContent = user_data[i].strength+"%"
      var div6= document.createElement("div")
      div6.className = "progress progress-mini"
      var div7 = document.createElement("div")
      var stren= user_data[i].strength
      var col = "green"
      if(stren==0 || stren==25){
            col = "red"
      }
      else if(stren==50){
            col = "purple"
      }
      else if(stren==75){
            col = "blue"
      }
      else if(stren==100){
            col = "green"
      }
      var q="progress-bar bg-"+col
      div7.className =q
      div7.style = "width: "+ stren+"%;"
      button1 = document.createElement("button")
      button1.className = "myDIV btn btn-primary-spacing"
      button1.id= user_data[i].entry
      button1.textContent = "View"
      button1.title =user_data[i].password 
      button2 = document.createElement("button")
      button2.className = "btn btn-primary-spacing reset"
      button2.textContent = "Reset"
      button2.title= user_data[i].entry
      div4.appendChild(button1)
      div4.appendChild(button2)
      div6.appendChild(div7)
      div3.appendChild(div4)
      div5.appendChild(h2)
      div3.appendChild(div5)
      div1.appendChild(h1)
      div1.appendChild(div3)
      div1.appendChild(div6)
      //div1.appendChild(div2)
      var linebreak = document.createElement("h1")
      linebreak.textContent = ""
      newdiv.appendChild(div1)
      newdiv.appendChild(linebreak)
      master.appendChild(newdiv)
      var ta= document.getElementById(user_data[i].entry)
    }
    const btns = document.getElementsByClassName('myDIV btn btn-primary-spacing');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener('click', function (e) {
          ipcRenderer.send("password-detail",e.target.title)
        });
      }
    const btns2 = document.getElementsByClassName('btn btn-primary-spacing reset');
    for (let i = 0; i < btns2.length; i++) {
        btns2[i].addEventListener('click', function (e) {
          ipcRenderer.send("change-password",e.target.title)
        });
      }
}

function show_pass(password){
    console.log(password)
}

const read_data = () =>{
      return new Promise((resolve,reject)=>{
            filepath = path.join(__dirname,'../local-storage.txt')
            fs.readFile(filepath, 'utf-8', (err, data) => {
                  if(err){
                      alert("An error ocurred reading the file :" + err.message);
                      return;
                  }
            
                  // Change how to handle the file content
                  resolve(JSON.parse(data))
      })
})
}


render()



const view_password = document.getElementsByClassName('myDIV btn btn-primary-spacing')

view_password.addEventListener('click',function(event){
    console.log("line 105")
})


document.body.addEventListener( 'click', function ( event ) {
    if( event.target.id == 'yahoo' ) {
      console.log
    };
  } );






/*                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div class="admin-content analysis-progrebar-ctn res-mg-t-15">
                                <h4 class="text-left text-uppercase"><b>Facebook</b></h4>
                                <div class="colvertical-center-box vertical-center-box-tablet">
                                    <div class="row-xs-1 mar-bot-15 text-left">
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >View</button>
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >Reset</button>
                                    </div>
                                    <div class="row-xs-1 cus-gh-hd-pro">
                                        <h2 class="text-right no-margin">Strength</h2>
                                    </div>
                                </div>
                                <div class="progress progress-mini">
                                    <div style="width: 100%;" class="progress-bar bg-green"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12" style="margin-bottom:1px;">
                            <div class="admin-content analysis-progrebar-ctn res-mg-t-30">
                                <h4 class="text-left text-uppercase"><b>InstaGram</b></h4>
                                <div class="col vertical-center-box vertical-center-box-tablet">
                                    <div class="row-xs-1 mar-bot-15 text-left">
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >View</button>
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >Reset</button>
                                    </div>
                                    <div class="row-xs-1 cus-gh-hd-pro">
                                        <h2 class="text-right no-margin">Strength</h2>
                                    </div>
                                </div>
                                <div class="progress progress-mini">
                                    <div style="width: 38%;" class="progress-bar progress-bar-danger bg-red"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div class="admin-content analysis-progrebar-ctn res-mg-t-30">
                                <h4 class="text-left text-uppercase"><b>Github</b></h4>
                                <div class="col vertical-center-box vertical-center-box-tablet">
                                    <div class="row-xs-1 mar-bot-15 text-left">
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >View</button>
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >Reset</button>
                                    </div>
                                    <div class="row-xs-1 cus-gh-hd-pro">
                                        <h2 class="text-right no-margin">Strength</h2>
                                    </div>
                                </div>
                                <div class="progress progress-mini">
                                    <div style="width: 60%;" class="progress-bar bg-blue"></div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <div class="admin-content analysis-progrebar-ctn res-mg-t-30">
                                <h4 class="text-left text-uppercase"><b>G-mail</b></h4>
                                <div class="col vertical-center-box vertical-center-box-tablet">
                                    <div class="row-xs-1 mar-bot-15 text-left">
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >View</button>
                                        <button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >Reset</button>
                                    </div>
                                    <div class="row-xs-1 cus-gh-hd-pro">
                                        <h2 class="text-right no-margin">Strength</h2>
                                    </div>
                                </div>
                                <div class="progress progress-mini">
                                    <div style="width: 60%;" class="progress-bar bg-purple"></div>
                                </div>
                            </div>   
                        </div>
*/