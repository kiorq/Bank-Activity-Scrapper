import BasePage from "./BasePage";
import readEmails from "./../readEmails";
const log = require("debug")("scrapper:page");

const TEXTBOX_USERNAME = ".login-enclosure #login_username";
const TEXTBOX_PASSWORD = ".login-enclosure #login_password";
const BUTTON_SUBMIT = ".login-enclosure #login-button";
const TEXTBOX_VERIFICATION = ".oj-inputpassword #otp";
const CONTAINER_NETWORTH = ".networth";

export default class HomePage extends BasePage {
    load = () => {
        const url = "https://www.butterfieldonline.com/";

        log(`Loading ${url}`);

        return this.page.goto(url);
    };

    waitFor = async () => {
        log("Waiting for page to load");

        try {
            await Promise.all([
                this.page.waitFor(TEXTBOX_USERNAME),
                this.page.waitFor(TEXTBOX_PASSWORD),
                this.page.waitFor(BUTTON_SUBMIT)
            ]);
        } catch (error) {
            log("Could not find elements for page");
            throw error;
        }
    };

    login = async (login: string, password: string) => {
        log("Filling login form");

        await this.sendKeys(TEXTBOX_USERNAME, login);
        await this.sendKeys(TEXTBOX_PASSWORD, password);
        await this.click(BUTTON_SUBMIT);
    };

    isVerificationRequired = async () => {
        try {
            await this.page.waitFor(TEXTBOX_VERIFICATION, { timeout: 8000 });
            return true;
        } catch (error) {
            return false;
        }
    };

    handleVerification = async (login: string, password: string) => {
        const required = await this.isVerificationRequired();

        if (!required) {
            return;
        }

        log("Verification required");

        // give it some time for the email to send
        await this.page.waitFor(40000);
        // read new emails
        const emailsFound = readEmails(login, password);

        // TODO: filter out emails and find one with verification code
    };

    succeeded = async () => {
        try {
            await this.page.waitFor(CONTAINER_NETWORTH, { timeout: 15000 });
            log("Logged in successfully");
        } catch (error) {
            log("Could not login");
            throw error;
        }
    };
}
