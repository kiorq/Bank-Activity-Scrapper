import { Browser } from "puppeteer";
const puppeteer = require("puppeteer");
const log = require("debug")("scrapper:browser");

type BrowserSettings = {
    headless: boolean;
};

const USER_AGENTS = [
    "Mozilla/5.0 (Linux; Android 6.0; HTC One X10 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 5.1.1; SM-G928X Build/LMY47X) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.83 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1",
    "Mozilla/5.0 (X11; CrOS x86_64 8172.45.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.64 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.111 Safari/537.36"
];

export const getBrowser = (settings: BrowserSettings) => {
    return puppeteer.launch({
        headless: settings.headless || false,
        defaultViewport: { width: 800, height: 800 }
    });
};

export const configPage = async (browser: Browser) => {
    const userAgent = USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    const pagesFound = await browser.pages();
    const page = pagesFound[0];

    // set user agent
    await page.setUserAgent(userAgent);
    log(`User agent: ${userAgent}`);

    return page;
};
