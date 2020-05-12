const express = require('express');
const app = express();
const https = require('https');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/get-binance-products', (req, res) => {
  https.get('https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products', (resp) => {
    let data = '';

    resp.on('data', (chunk) => {
      data += chunk;
    });

    resp.on('end', () => {
      res.send(data);
    });
  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
});

app.listen(3002, () => {
  console.log('Server listening on port 3002!');
});
