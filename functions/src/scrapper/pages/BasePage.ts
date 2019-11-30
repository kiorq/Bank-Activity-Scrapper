import { randomBetween } from "./../service";

export default class BasePage {
    page = null;

    constructor(page: Object) {
        this.page = page;
    }

    sendKeys = async (selector: string, value: string) => {
        const textArray = value.split("");

        await this.page.focus(selector);

        for (let i = 0; i < textArray.length; i++) {
            await this.page.waitFor(randomBetween(100, 280));
            await this.page.keyboard.type(textArray[i]);
        }
    };

    click = async (selector: string) => {
        await this.page.waitFor(selector);
        await this.page.waitFor(randomBetween(700, 950));
        await this.page.click(selector, { clickCount: 2, delay: 450 });
    };
}
