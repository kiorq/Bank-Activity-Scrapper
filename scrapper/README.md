# Kiorq Bank Scrapper

Scrapper job that logs into bank account extracts transaction information and sends it to api

## Installing Dependencies

`npm install`

## Running server

- Dev run: `DEBUG=scrapper:main,scrapper:page LOGIN=*** PASSWORD=*** npm run dev:run`

## Environment variables

- `BANK_USERNAME`: Butterfield login (string)
- `BANK_PASSWORD`: Butterfield Password (string)
- `BANK_ACCOUNT_POSITION`: What place position is the account in the dropdown selection (number)
- `EMAIL_LOGIN`: Gmail email login for email address that butterfield sents verification email to (string)
- `EMAIL_PASSWORD` Gmail password (string)
- `HEADLESS`: Should run in headless (1 or 0)