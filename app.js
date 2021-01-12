
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res)
{
  res.sendFile(__dirname +"/index.html");
});
  app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "8c5fcc9de2465a719bd6bf528cff7006";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+units;
    https.get(url,function(response){
      console.log(response.statusCode);
      if(response.statusCode == 200)
      {
      response.on("data", function(data){
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
        const imgURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
        res.write("<h1 style='text-align:center;color:#0278ae;margin-top:15%;'>The temperature in "+ query +" is " + temp + " degrees Celcius.</h1>");
        res.write("<p style='text-align:center;color:#0278ae;'>The weather is currently " + description +"</p>");
        res.write("<img style='margin-left:45%;' src = "+ imgURL +">");
        res.send();
      });
    }
    else
    {
      res.write("<h1 style='text-align:center;color:red;margin-top:15%;'>OPPS!</h1> <br><p style='text-align:center;color:#0278ae;'>Enter a City Name</p>")
    }
    });
  });
app.listen(process.env.PORT || 3000,function(){
  console.log("server started at port 3000");
});
//aasaaaaa
