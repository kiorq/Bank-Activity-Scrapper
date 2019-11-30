import { amountToFloat } from "./service";
const moment = require("moment");

export interface Transaction {
    description: string;
    date: string;
    timestamp: number;
    amount: number;
    type: "debit" | "credit";
    referenceNo: string;
}
type RequestData = {
    transactions: Array<Transaction>;
    total_amount: number;
};

type SummaryData = {
    AvailableBalance: string;
};

export const prepareData = (summaryData: object, activity: Array<object>): RequestData => {
    const transactions = activity.map(
        (txn: object): Transaction => {
            const amount = amountToFloat(txn["CreditAmount"] !== "" ? txn["CreditAmount"] : txn["DebitAmount"]);
            const type = txn["CreditAmount"] !== "" ? "credit" : "debit";

            return {
                date: moment(txn["ValueDate"], "D MMM YYYY").format(),
                description: txn["Description"],
                timestamp: moment().unix(),
                amount,
                type,
                referenceNo: txn["ReferenceNo"]
            };
        }
    );

    return {
        total_amount: amountToFloat(summaryData["AvailableBalance"]),
        transactions
    };
};

export const storeTransaction = (requestData: RequestData) => {
    // IT MIGHT BE A BETTER IDEA TO USE FIREBASE (OR ALTERNATIVE)
    // THAN TO USE AN API, THIS WAY THE APP CAN DIRECTLY CONNECT THE DB
    // CAN FIREBASE SEND NOTIFICATIONS?
};
