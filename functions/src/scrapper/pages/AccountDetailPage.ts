import BasePage from "./BasePage";

const TEXT_NICKNAME = ".nickname";

export default class AccountDetailPage extends BasePage {
    waitFor = async () => {
        console.log("Waiting for account detail page");

        try {
            await this.page.waitFor(TEXT_NICKNAME);
        } catch (error) {
            console.error("account detail didn't load");
            throw error;
        }
    };

    getSummaryData = async () => {
        await this.page.waitFor(8000);

        console.log("Extracting data from summary tab");

        const summaryData: any = {};

        const rowsFound = await this.page.$$("row");

        for (const row of rowsFound) {
            const rowText = await this.page.evaluate(el => el.innerText, row);
            const [label, value] = rowText.split("\n");

            summaryData[label.replace(" ", "")] = value;
        }

        return summaryData;
    };

    getActivity = async () => {
        console.log("Extracting data from activity tab");

        const activity = [];

        await this.click("[alt=Activity]");
        await this.page.waitFor(8000);

        const transactions = await this.page.$$("tbody tr");

        for (const row of transactions) {
            const transactionData = await this.page.evaluate(el => el.innerText.split("\t"), row);

            activity.push({
                ValueDate: transactionData[1],
                TransactionDate: transactionData[2],
                Description: transactionData[3],
                CreditAmount: transactionData[4],
                DebitAmount: transactionData[5],
                Balance: transactionData[6],
                ReferenceNo: transactionData[7]
            });
        }

        return activity;
    };
}
