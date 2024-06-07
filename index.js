require('dotenv').config();
const venom = require('venom-bot');
const axios = require('axios');
const qrcode = require('qrcode-terminal');

console.log("Starting Your Branded WhatsApp bot...");

venom.create({
  session: 'session-name', // name of session
  multidevice: true, // for version 4.x+
  headless: true, // Runs in headless mode, without a browser UI
  devtools: false, // If true, it will open devtools when the session is created
  useChrome: true, // Uses Chrome instead of Chromium
  debug: false, // Opens a debug session
  browserArgs: ['--no-sandbox'], // Optional: Additional args to pass to the browser instance
})
  .then((client) => {
    console.log("Initializing Your Branded WhatsApp client...");
    
    // Set up the event listeners
    client.onMessage((message) => {
      console.log('Message received:', message); // Log the entire message object
      handleMessage(client, message);
    });

    client.onStateChange((state) => {
      console.log('State changed: ', state);
      if ('CONFLICT'.includes(state)) client.useHere();
      if ('UNPAIRED'.includes(state)) console.log('logout');
    });

    client.onAnyMessage((message) => {
      console.log('Any message received: ', message.body);
    });

    client.onAck((ack) => {
      console.log('Message ack: ', ack);
    });

    client.onIncomingCall((call) => {
      console.log('Incoming call: ', call);
      client.sendText(call.peerJid, "Sorry, I still can't answer calls");
    });

    client.onStreamChange((state) => {
      console.log('State Connection Stream: ' + state);
      clearTimeout(time);
      if (state === 'DISCONNECTED' || state === 'SYNCING') {
        time = setTimeout(() => {
          client.close();
        }, 80000);
      }
    });

    process.on('SIGINT', function() {
      client.close();
    });

    process.on('unhandledRejection', error => {
      console.error('Unhandled promise rejection:', error);
    });

    // Start the client after setting up the event listeners
    start(client);
  })
  .catch((error) => console.log('Error initializing the client:', error));

function handleMessage(client, message) {
  console.log(`Handling message: ${message.body}`); // Additional logging
  if (message.body === '/top') {
    try {
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=${process.env.API_KEY}`)
        .then(response => {
          const topPicks = response.data['Time Series (Daily)'][Object.keys(response.data['Time Series (Daily)'])[0]]; // Example data
          client.sendText(message.from, `Top Picks:\n${JSON.stringify(topPicks)}`);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          client.sendText(message.from, 'Sorry, there was an error fetching the data.');
        });
    } catch (error) {
      console.error('Error in handleMessage:', error);
    }
  }
}

function start(client) {
  client.onMessage((message) => {
    console.log(`Message received in start: ${message.body}`);
    handleMessage(client, message);
  });

  client.onStateChange((state) => {
    console.log('State changed in start: ', state);
    if ('CONFLICT'.includes(state)) client.useHere();
    if ('UNPAIRED'.includes(state)) console.log('logout');
  });
}
