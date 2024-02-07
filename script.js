const express = require('express')
const app = express()
const port = 3000
var request = require('request');
const bodyParser = require('body-parser');
var multer = require('multer');
const { resolveConfig } = require('vite');
var upload = multer();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(upload.array());


let mData = ""
let coinName = "bitcoin"
let mChart = ""

async function resData(coinName){
  var marketData = await new Promise((resolve,reject)=>{

  
    request('https://api.coingecko.com/api/v3/coins/'+ coinName, function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', typeof body); // Print the HTML for the Google homepage.
      mData = JSON.parse(body)
    resolve(mData)
  
    });
})

   if(marketData){
   var marketChart = await new Promise((resolve,reject)=>{

  
    request('https://api.coingecko.com/api/v3/coins/'+ coinName + '/market_chart?vs_currency=usd&days=30', function (error, response, body) {
      console.error('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', typeof body); // Print the HTML for the Google homepage.
      mChart = JSON.parse(body)
      //console.log(mchart)
    resolve(mData)
    
    });
})
   }
}






app.get('/', async(req, res) => {
  await resData(coinName)
  res.render('index',{mData,mChart} )
})


app.post('/', async(req, res) => {
  coinName = req.body.selectCoin; 
  await resData(coinName)
  res.render('index',{mData,mChart} )
})

app.listen(port, () => {
  console.log(`Example app listening on https://localhost:${port}`)
})

