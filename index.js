require('dotenv').config();
const twilio = require('twilio');
const axios = require('axios');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

async function sendStockAlert() {
    try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.API_KEY}`);
        const topPicks = response.data['Time Series (Daily)'][Object.keys(response.data['Time Series (Daily)'])[0]];
        const message = `Top Picks:\n${JSON.stringify(topPicks)}`;

        await client.messages.create({
            from: process.env.TWILIO_WHATSAPP_NUMBER,
            body: message,
            to: 'whatsapp:+91xxxxxxxxxx'  // Replace with the recipient's WhatsApp number
        });

        console.log('Stock alert sent successfully!');
    } catch (error) {
        console.error('Error sending stock alert:', error);
    }
}

// Call the function to send a stock alert
sendStockAlert();
