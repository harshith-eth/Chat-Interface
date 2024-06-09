require('dotenv').config();
const twilio = require('twilio');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;
const client = new twilio(apiKey, apiSecret, { accountSid });

// Function to send a stock alert
async function sendStockAlert() {
  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.API_KEY}`);
    const stockData = response.data['Time Series (Daily)'];
    const latestDate = Object.keys(stockData)[0];
    const latestStockInfo = stockData[latestDate];

    const messageBody = `Stock Alert for IBM on ${latestDate}:\nOpen: ${latestStockInfo['1. open']}\nHigh: ${latestStockInfo['2. high']}\nLow: ${latestStockInfo['3. low']}\nClose: ${latestStockInfo['4. close']}\nVolume: ${latestStockInfo['5. volume']}`;

    const message = await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      body: messageBody,
      to: 'whatsapp:+918792351810' // Replace with your phone number
    });

    console.log('Stock alert sent successfully!');
  } catch (error) {
    console.error('Error sending stock alert:', error);
  }
}

// Endpoint to handle incoming messages
app.post('/incoming', (req, res) => {
  const message = req.body.Body.trim().toLowerCase();
  
  if (message === 'stock') {
    sendStockAlert().then(() => {
      res.send('<Response><Message>Stock alert sent!</Message></Response>');
    }).catch(error => {
      res.send('<Response><Message>Error sending stock alert.</Message></Response>');
    });
  } else {
    res.send('<Response><Message>Unknown command.</Message></Response>');
  }
});

// Endpoint to handle status callbacks
app.post('/status', (req, res) => {
  console.log('Message status:', req.body);
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
