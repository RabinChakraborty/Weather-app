const express = require('express');
const app = express();
const https = require('https');
const bodyParser= require("body-parser")

 app.use(bodyParser.urlencoded({extended:true}))



app.get('/', (req, res) => {
  res.sendFile(__dirname +"/index.html")
  
});
app.post("/",(req,res)=>{
  const query= req.body.cityName;
  const appId="a9833d0cf933f257fa2ee7385d081a70"
  const url =
    'https://api.openweathermap.org/data/2.5/weather/?q='+ query +'&appid='+appId+'&units=metric';
  
  
  
  https.get(url, (response) => {
    console.log(response.statusCode);
    response.on("data",(data)=>{
      const weatherData= JSON.parse(data)
      const temp=weatherData.weather[0].description
      const temp2=weatherData.main.temp
      const icon=weatherData.weather[0].icon
  const imgurl= "http://openweathermap.org/img/wn/"+icon+"@2x.png"
  res.type("html")
      res.write(`<h1>The temperature is ${temp2} degrees celcius </h1>`)
       res.write("<img src="+ imgurl +">")
       res.write(`<h1>The weather description is  ${temp} </h1>`)
        res.send();
    })
  });
})




app.listen(3000, () => {
  console.log('server is running on port 3000');
});
