import { randomBetween } from "./../service";
import { Page } from "puppeteer";

export default class BasePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    sendKeys = async (selector: string, value: string) => {
        const textArray = value.split("");

        await this.page.focus(selector);

        for (const letter in textArray) {
            await this.page.waitFor(randomBetween(100, 280));
            await this.page.keyboard.type(letter);
        }
    };

    click = async (selector: string) => {
        await this.page.waitFor(selector);
        await this.page.waitFor(randomBetween(700, 950));
        await this.page.click(selector, { clickCount: 2, delay: 450 });
    };
}
