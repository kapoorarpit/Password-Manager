var fs = require('fs')

async function render(){
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
      button1.className = "btn btn-primary-spacing "
//<button id="add111" data-toggle="tooltip" data-placement="left" title="Download Report" class="btn" >View</button>
      button1.textContent = "view"
      button2 = document.createElement("button")
      button2.className = "btn btn-primary-spacing "
      button2.textContent = "reset"
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
      newdiv.appendChild(div1)
      master.appendChild(newdiv)
      console.log(await read_data())
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