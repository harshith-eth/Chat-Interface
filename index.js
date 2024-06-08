require('dotenv').config();
const twilio = require('twilio');
const axios = require('axios');

// Verify environment variables are loaded correctly
console.log('TWILIO_ACCOUNT_SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN:', process.env.TWILIO_AUTH_TOKEN);
console.log('TWILIO_API_KEY:', process.env.TWILIO_API_KEY);
console.log('TWILIO_API_SECRET:', process.env.TWILIO_API_SECRET);
console.log('TWILIO_WHATSAPP_NUMBER:', process.env.TWILIO_WHATSAPP_NUMBER);
console.log('API_KEY:', process.env.API_KEY);

// Retrieve Twilio credentials from environment variables
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

// Call the function to send a stock alert
sendStockAlert();
