import app from "./app";
import { requireValue } from "./service";
import { Config } from "./types";

const config: Config = {
    browser: {
        headless: parseInt(process.env.HEADLESS || "0")
    },
    debug: {
        enable: process.env.HEADLESS || ""
    },
    bank: {
        username: requireValue(process.env.BANK_USERNAME),
        password: requireValue(process.env.BANK_PASSWORD),
        account_position: parseInt(requireValue(process.env.BANK_ACCOUNT_POSITION))
    },
    store: {
        key: requireValue(process.env.STORE_KEY)
    },
    email: {
        login: requireValue(process.env.EMAIL_LOGIN),
        password: requireValue(process.env.EMAIL_PASSWORD)
    },
    run: {
        as_script: "1"
    }
};

app(config).catch(error => {
    console.error(error);
});
