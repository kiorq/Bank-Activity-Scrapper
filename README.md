# Bank Activity Scrapper

scheduled jobs that logs into my butterfield online banking account and scrapes the latest activity/transactions and stores it to a firebase database. From then the data can be used to make an improved view of banking transactions.

## Configuration for firebase run

```BASH
$ firebase functions:config:get

{
  "store": {
    "key": "***"
  },
  "email": {
    "password": "***",
    "login": "***"
  },
  "browser": {
    "headless": "1"
  },
  "bank": {
    "password": "***",
    "username": "***",
    "account_position": "***"
  },
  "debug": {
    "enable": "scrapper:main,scrapper:page,scrapper:store,scrapper:browser"
  }
}
```

## Run locally

`DEBUG=scrapper:main,scrapper:page,scrapper:store HEADLESS=0 BANK_USERNAME=*** BANK_PASSWORD=*** BANK_ACCOUNT_POSITION=1 EMAIL_LOGIN=*** EMAIL_PASSWORD=*** STORE_KEY=MainAccount npm run run:scrapper`

## Deploy to firebase

`firebase deploy --only functions`
