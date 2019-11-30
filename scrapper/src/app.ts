import { requireValue } from "./service";
import getBrowser from "./browser";
import { prepareData, storeTransaction } from "./apiRequest";

// pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AccountDetailPage from "./pages/AccountDetailPage";

const log = require("debug")("scrapper:main");

const BANK_USERNAME: string = requireValue(process.env.BANK_USERNAME);
const BANK_PASSWORD: string = requireValue(process.env.BANK_PASSWORD);
const BANK_ACCOUNT_POSITION: number = parseInt(requireValue(process.env.BANK_ACCOUNT_POSITION));
const EMAIL_LOGIN: string = requireValue(process.env.EMAIL_LOGIN);
const EMAIL_PASSWORD: string = requireValue(process.env.EMAIL_PASSWORD);
const HEADLESS: number = parseInt(process.env.HEADLESS || "0");

(async () => {
    let browser = null;
    try {
        log("Starting up browser");
        browser = await getBrowser({
            headless: HEADLESS === 1
        });
        // find page to use
        const pagesFound = await browser.pages();
        const page = pagesFound[0];
        // initiate page controllers
        const homePage = new HomePage(page);
        const dashboardPage = new DashboardPage(page);
        const accountDetailPage = new AccountDetailPage(page);

        // login
        log("Logging in");
        await homePage.load();
        await homePage.waitFor();
        await homePage.login(BANK_USERNAME, BANK_PASSWORD);
        await homePage.handleVerification(EMAIL_LOGIN, EMAIL_PASSWORD);
        await homePage.succeeded();

        // dashboard
        await dashboardPage.waitFor();
        await dashboardPage.navToAccountDetails();
        await dashboardPage.selectAccount(BANK_ACCOUNT_POSITION);
        await dashboardPage.succeeded();

        // account details
        await accountDetailPage.waitFor();
        const summaryData = await accountDetailPage.getSummaryData();
        const activity = await accountDetailPage.getActivity();

        const requestData = prepareData(summaryData, activity);

        console.log(activity);
        console.log("requestData", requestData);
    } catch (error) {
        console.log(error);
        log("Closing browser because of error");
        browser && (await browser.close());
    } finally {
        log("Closing browser because script has ended");
        // browser && (await browser.close());
    }
})();
