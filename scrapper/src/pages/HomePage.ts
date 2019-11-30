import BasePage from "./BasePage";
import { findEmail } from "./../readEmails";
const log = require("debug")("scrapper:page");

const TEXTBOX_USERNAME = ".login-enclosure #login_username";
const TEXTBOX_PASSWORD = ".login-enclosure #login_password";
const BUTTON_SUBMIT = ".login-enclosure #login-button";
const TEXTBOX_VERIFICATION = "#otp";
const REFERENCE_NUMBER = "#referenceNo";
const BUTTON_VERIFICATION_SUBMIT = "button.action-button-primary";
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
            await this.page.waitFor(7000);
            await this.page.waitFor(REFERENCE_NUMBER, { timeout: 8000 });
            return true;
        } catch (error) {
            console.log("NOT REQUIRED");
            return false;
        }
    };

    getReferenceNumber = async () => {
        const element = await this.page.$(REFERENCE_NUMBER);
        const text = await this.page.evaluate(element => element.value, element);

        return text;
    };

    handleVerification = async (login: string, password: string) => {
        const required = await this.isVerificationRequired();

        if (!required) {
            return;
        }

        log("Verification required");

        await this.page.waitFor(7000);

        // get reference number
        const referenceNumber = await this.getReferenceNumber();
        const emailSubjectLookup = new RegExp(referenceNumber);
        // look for verification email
        const verificationEmail = await findEmail(emailSubjectLookup, 60000, login, password);
        // get verification code
        const verificationCode = verificationEmail["body"].match(/<strong>is ([0-9]+)<\/str/)[1];
        // submit verification code
        await this.sendKeys(TEXTBOX_VERIFICATION, verificationCode);
        await this.click(BUTTON_VERIFICATION_SUBMIT);

        log(`Handled verification for refNo: ${referenceNumber} - code: ${verificationCode}`);
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
