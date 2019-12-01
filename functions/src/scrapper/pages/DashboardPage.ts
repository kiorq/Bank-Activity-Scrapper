import BasePage from "./BasePage";

const CONTAINER_NETWORTH = ".networth";
const MENU_BAR = ".icon-menu-bar";
const MENU_ACCOUNT_DROPDOWN = ".icon-accounts";
const MENU_CHECKING_SAVINGS_DROPDOWN = "#ACCOUNTS_TITLE [id$=CASA_ACCOUNT] .oj-navigationlist-item-label";
const MENU_ACCOUNT_DETAILS = "#ACCOUNTS_TITLE [id$=CASA_ACCOUNT] .oj-navigationlist-group li";
const ACCOUNT_SELECT = "[id^=ojChoiceId_accountNumber]";
const ACCOUNT_SELECT_OPTION = "#oj-listbox-result-label-";
const ACCOUNT_SELECT_PROCEED_BUTTON = ".form-main-container button";
const TEXT_NICKNAME = ".nickname";

export default class DashboardPage extends BasePage {
    waitFor = async () => {
        console.log("Waiting for dashboard to load");

        try {
            await Promise.all([this.page.waitFor(CONTAINER_NETWORTH), this.page.waitFor(MENU_BAR)]);
        } catch (error) {
            console.error("Dashboard didn't load");
            throw error;
        }
    };

    navToAccountDetails = async () => {
        console.log("Navigating to account details");

        await this.click(MENU_BAR);
        await this.click(MENU_ACCOUNT_DROPDOWN);
        await this.click(MENU_CHECKING_SAVINGS_DROPDOWN);
        await this.click(MENU_ACCOUNT_DETAILS);
    };

    selectAccount = async (accountListPosition: number) => {
        console.log(`Selecting account by position: ${accountListPosition}`);
        await this.click(ACCOUNT_SELECT);
        await this.click(`${ACCOUNT_SELECT_OPTION}${accountListPosition + 1}`);
        await this.click(ACCOUNT_SELECT_PROCEED_BUTTON);
    };

    succeeded = async () => {
        try {
            await this.page.waitFor(TEXT_NICKNAME);
            console.log("Successfully navigated to to account detail");
        } catch (error) {
            console.error("Could not navigate to account detail");
            throw error;
        }
    };
}
