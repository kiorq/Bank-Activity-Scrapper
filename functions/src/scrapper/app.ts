import { Config } from "./types";
import { getBrowser, configPage } from "./browser";
import { prepareData, storeTransactions } from "./storeData";

// pages
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import AccountDetailPage from "./pages/AccountDetailPage";

export default async (config: Config) => {
    let browser = null;
    const runAsScript = config.run && config.run.as_script === "1";
    try {
        console.log("Starting up browser");
        browser = await getBrowser({
            headless: config.browser.headless === 1
        });
        // find page to use
        const page = await configPage(browser);

        // initiate page controllers
        const homePage = new HomePage(page);
        const dashboardPage = new DashboardPage(page);
        const accountDetailPage = new AccountDetailPage(page);

        // login
        console.log("Logging in");
        await homePage.load();
        await homePage.waitFor();
        await homePage.login(config.bank.username, config.bank.password);
        await homePage.handleVerification(config.email.login, config.email.password);
        await homePage.succeeded();

        // dashboard
        await dashboardPage.waitFor();
        try {
            await dashboardPage.navToAccountDetails();
        } catch (error) {
            // hack to try and prevent script from failing
            console.log("Could not navigate to account details, reloading and trying again");
            await homePage.load();
            await dashboardPage.waitFor();
            await dashboardPage.navToAccountDetails();
        }
        await dashboardPage.selectAccount(config.bank.account_position);
        await dashboardPage.succeeded();

        // account details
        await accountDetailPage.waitFor();
        const summaryData = await accountDetailPage.getSummaryData();
        const activity = await accountDetailPage.getActivity();

        const requestData = prepareData(summaryData, activity);

        // store data in firebase
        console.log("Storing data extracted to firebase");
        await storeTransactions(config.store.key, requestData);
    } catch (error) {
        console.log("Closing browser because of error", error);
        browser && (await browser.close());
        runAsScript && process.exit(1);
    } finally {
        console.log("Closing browser because script has ended");
        browser && (await browser.close());
        runAsScript && process.exit();
    }
};
