const puppeteer = require("puppeteer");

type BrowserSettings = {
    headless: boolean;
};

export const getBrowser = (settings: BrowserSettings) => {
    return puppeteer.launch({
        headless: settings.headless || false,
        defaultViewport: { width: 800, height: 800 }
    });
};

export const configPage = async browser => {
    const pagesFound = await browser.pages();
    const page = pagesFound[0];

    // set user agent
    await page.setUserAgent(
        // "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36"
        // "Mozilla/5.0 (iPhone9,4; U; CPU iPhone OS 10_0_1 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/14A403 Safari/602.1"
        "Mozilla/5.0 (Linux; Android 6.0; HTC One X10 Build/MRA58K; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/61.0.3163.98 Mobile Safari/537.36"
    );

    return page;
};
