# Kiorq Bank Activity Firebase Scrapper

This repo is a scheduler that logs into my butterfield account and scrapes the latest activity/transactions and adds it to my firebase database. This way I can use this data to do whatever I want with it. Like create an apple watch app to show how much I have in an account or send me a daily email update of my activity.

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