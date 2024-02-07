const express = require('express')
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000

var request = require('request')
const bodyParser = require('body-parser')
var multer = require('multer')
const { resolveConfig } = require('vite')
var upload = multer()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(upload.array())

let mData = ''
let coinName = 'bitcoin'
let mChart = ''

async function resData(coinName) {
  // Set custom headers
  const headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.75 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
  };

  // Request for market data
  var marketData = await new Promise((resolve, reject) => {
    request(
      {
        url: 'https://api.coingecko.com/api/v3/coins/' + coinName,
        headers: headers
      },
      function (error, response, body) {
        console.log({ body });
        console.error('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', typeof body);
        mData = JSON.parse(body);
        resolve(mData);
      }
    );
  });

  // Check if marketData is available before making the second request
  if (marketData) {
    // Request for market chart
    var marketChart = await new Promise((resolve, reject) => {
      request(
        {
          url: 'https://api.coingecko.com/api/v3/coins/' + coinName + '/market_chart?vs_currency=usd&days=30',
          headers: headers
        },
        function (error, response, body) {
          console.log({ body });
          console.error('error:', error);
          console.log('statusCode:', response && response.statusCode);
          console.log('body:', typeof body);
          mChart = JSON.parse(body);
          resolve(mData);
        }
      );
    });
  }
}


app.get('/', async (req, res) => {
  await resData(coinName)
  res.render('index', { mData, mChart })
})

app.post('/', async (req, res) => {
  coinName = req.body.selectCoin
  await resData(coinName)
  res.render('index', { mData, mChart })
})

app.listen(port, () => {
  console.log(`Example app listening on localhost:${port}`)
})
