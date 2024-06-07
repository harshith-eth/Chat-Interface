# WhatsAppTradingBot

WhatsApp Trading Bot is an automated bot designed to provide real-time stock market alerts and updates via WhatsApp. This bot connects to your WhatsApp account and fetches the latest stock prices, top picks, and market news. Users can send commands like "/top" or "/price [stock symbol]" to receive relevant information directly in their WhatsApp chat. The bot is built using Node.js and Venom-bot, ensuring seamless integration and functionality. Ideal for traders who want to stay updated on the go.

## Features

- Real-time stock price updates
- Daily top stock picks at 9 AM EST
- Market news and updates
- Customizable alerts for specific stock prices
- Easy setup and integration with WhatsApp

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)
- A WhatsApp account

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/harshith2810/WhatsAppTradingBot.git
    cd WhatsAppTradingBot
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add your API key:

    ```makefile
    API_KEY=your_api_key_here
    ```

4. Start the bot:

    ```bash
    node index.js
    ```

5. Scan the QR code with your WhatsApp account to link the bot.

## Usage

Once the bot is running and linked to your WhatsApp account, you can use the following commands:

- **/top**: Get the top stock picks for the day.
- **/price [stock symbol]**: Get the current price for the specified stock symbol.
- **/set alert [stock symbol] [price]**: Set an alert for the specified stock symbol and price.

## Future Vision

As part of Exitliquidity, Inc., the WhatsApp Trading Bot is positioned as a premier alerts product aimed at providing unparalleled market insights to our users. This product will enable traders to stay ahead of market movements and make informed decisions. Our goal is to achieve significant market traction and ultimately sell the product at a high valuation, reflecting its value and impact in the financial technology space.

## Contributing

We welcome contributions from the community! If you have suggestions, feature requests, or would like to contribute code, please fork the repository and submit a pull request. Open issues to discuss your ideas or report bugs.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or suggestions, feel free to contact us at [hi@exitliquidity.io]
