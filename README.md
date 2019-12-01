# Kiorq Bank Activity Firebase Scrapper

This repo is a scheduler that logs into my butterfield account and scrapes the latest activity/transactions and adds it to my firebase database. This way I can use this data to do whatever I want with it. Like create an apple watch app to show how much I have in an account or send me a daily email update of my activity.

## Firebase Config

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

## Deploy to firebase

`firebase deploy --only functions`