output("p","bot","Welcome <br> Say Hi to start the conversation.....");

var user_input=document.getElementById("input")


user_input.addEventListener("click",function loadDoc() {
  var xhttp = new XMLHttpRequest();
  try{
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      
    var data= JSON.parse(this.responseText);
    var msg=document.getElementById("inp").value;
    
    document.getElementById("inp").value="";
    
    output("p","user",msg);
    
    if(msg=="Hi" || msg=="hi" || msg=="hy" || msg=="Hy")
    {
      output("p","bot",get_timeofday_greeting()+","+Greeting()+"<br>"+data["menu"]);
    }

    else if(msg.length==1)
    {
      if(data[msg]){
         output("p","bot",data[msg]);
         if(msg=="4"){
          output("p","bot","Say hi to restart the bot");
        }
      }

      else{
          output("p","bot","Plz enter only a number [1-4]");
      }
    }

    else if(msg.includes("calculate")){
      evaluator(msg.split(" ")[1]);
    }

    else if(msg.includes("city"))
    {
      weather(msg.split(" ")[1].trim())
    }

    else if(msg.includes("country")){
      corona(msg.split(" ")[1].trim());
    }

    else if(msg.includes("back")){
      output("p","bot",data["menu"]);
    }

    else{
      output("p","bot","Sorry I didnt get that");
    }

  }

 };

  xhttp.open("GET", "jsondata.json", true);
  xhttp.send();
  }

  catch(e){
    output("p","bot","Sorry I didnt get that");
  }

}

);


function output(tag,className,text){

  var reply= document.getElementById("main")


  if(className=="bot"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/becoming-human-chatbot-300x175.jpg">`;
  }

  if(className=="user"){
    reply.innerHTML+=`<img  class="user_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTrbGOT7l_cyQNoFXn8BuCGrPmTEdlrc-keug&usqp=CAU">`;
  }

  if(className=="image"){
    reply.innerHTML+=`<img class="bot_image" 
    src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/06/becoming-human-chatbot-300x175.jpg">`;
  }

  reply.innerHTML+=`<${tag} class=${className}>${text}</${tag}>`
}


function Greeting(){ 

  res=[" Nice to see you. I can provide the following options for you", 

  " Its a pleasure chatting with you. Here are the options I can provide you"];  
  
  return res[Math.floor((Math.random() * res.length))];
  
}


function get_timeofday_greeting(){

    var date = new Date();
    var current_time = date.getHours();
    let timeofday_greeting ="Good Morning"
    if(current_time>21)
        timeofday_greeting ="Good Night"
    else if(current_time>16)
        timeofday_greeting ="Good Evening"
    else if(current_time>=12)
        timeofday_greeting ="Good AfterNoon"
    
    return timeofday_greeting ;

}


function evaluator(expression){

    
    try{
        output("p","bot","Result of the expression:"+eval(expression)); 
        output("p","bot","If you want to calculate another expression enter the expression as 'calculate 1+2' or  "+"<br>"+ "enter back")
    }
    catch(e){
       output("p","bot","Enter a valid expression"); 
    }
        
}


function weather(city)
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&appid=0941ecd2acfb0f26b09f7b3ddbb438cf')
  .then(response => response.json())
  .then(wdata => {
      console.log(wdata['name']);

      output("p","image","<img style='margin-top:10px; margin-left:140px; width:400px; height:300px;' src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRN-exQgk3WVtjDSbPrqOUvtiHQtWhF9bLwZw&usqp=CAU'>");

      output("p","bot","**** This is the weather report in "
      +wdata['name']+"****"+"<br>"
      +"Minimun Temperature : "+wdata['main']['temp_min']+"°F"+"<br>"+"Maximun Temperature : "+wdata['main']['temp_max']+"°F"+"<br>"+"Description : "+wdata['weather'][0]['description']+"<br>"+"Humidity : "+wdata["main"]["humidity"]+"<br>"
      +"Pressure :"+wdata["main"]["pressure"]);
      output("p","bot","If you want to know weather of another city please enter the city name as 'city cityname' or "+"<br>"+ "enter back")
  })

  .catch(err => {
    output("p","bot","Please enter correct city name");
    input.value="";
    return 0;

  });

}

function corona(country)
{
  fetch('https://coronavirus-19-api.herokuapp.com/countries/'+country)
  .then(response => response.json())
  .then(cdata => {
      console.log(cdata['name']);

      output("p","image","<img style='margin-top:10px; margin-left:140px; width:400px; height:300px;' src='https://english.cdn.zeenews.com/sites/default/files/2020/05/24/862906-corona-positive-case.jpg'>");

      output("p","bot","**** Corona virus updates in "
      +cdata['country']+"****"+"<br>"
      +"Total no of cases : "+cdata['cases']+"<br>"
      +"Cases registered today: "+cdata['todayCases']+"<br>"
      +"Total no of deaths : "+cdata['deaths']+"<br>"
      +"Today deaths : "+cdata['todayDeaths']+"<br>"
      +"Recovered : "+cdata['recovered']+"<br>"
      +"Active cases : "+cdata['active']);
      output("p","bot","If you want to know corona updates of another country please enter the city name as 'country countryname' or "+"<br>"+ "enter back")
  })
  .catch(err => {
    output("p","bot","Please enter correct country name");
    input.value="";
    return 0;
  });
}
