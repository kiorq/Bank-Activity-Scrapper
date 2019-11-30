const puppeteer = require("puppeteer");

type BrowserSettings = {
    headless: boolean;
};

const getBrowser = (settings: BrowserSettings) => {
    return puppeteer.launch({
        headless: settings.headless || false,
        defaultViewport: { width: 800, height: 800 }
    });
};

export default getBrowser;
