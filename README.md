# Shortener URL

## Overview

Web service to shorten urls.

App running at: https://freecodecamp-lubien-shurl.herokuapp.com/

## Usage

### To create a short URL:

`https://freecodecamp-lubien-shurl.herokuapp.com/new/{valid URL}`

If you want a invalid URL, use:

`https://freecodecamp-lubien-shurl.herokuapp.com/invalid/{valid URL}`

Outputs example in sucess

```json
{
  "original_url": "http://google.com/",
  "short_url": "https://freecodecamp-lubien-shurl.herokuapp.com/{integer}"
}
```

On fail, outputs a empty JSON.

### To use

`https://freecodecamp-lubien-shurl.herokuapp.com/{integer}`

## Installation

`npm install` for dependencies.

Create a file named `.env` at the root of this project and set `MONGODB_URL=` pointing to your MongoDB provider.

Run either `npm start` or `node server.js`.

## License

MIT License.
