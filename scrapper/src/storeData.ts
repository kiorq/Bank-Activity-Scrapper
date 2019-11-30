import { amountToFloat } from "./service";
const moment = require("moment");
const firebase = require("firebase");
const log = require("debug")("scrapper:store");

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
            const date = moment(txn["ValueDate"], "D MMM YYYY");

            return {
                date: date.format(),
                description: txn["Description"],
                timestamp: date.unix(),
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

const initializeApp = () => {
    return firebase.initializeApp({
        apiKey: "AIzaSyDCRwgwKxAK7mVEa-Ll0_TUnX1Xs7rGJvE",
        authDomain: "kiorq-bank.firebaseapp.com",
        databaseURL: "https://kiorq-bank.firebaseio.com",
        projectId: "kiorq-bank",
        storageBucket: "kiorq-bank.appspot.com",
        messagingSenderId: "55343033469",
        appId: "1:55343033469:web:4b2e4335d39df54d881514",
        measurementId: "G-EMMSPKDPQR"
    });
};

const getTransactions = async ref => {
    const snapshot = await firebase
        .database()
        .ref(`/${ref}/transactions`)
        .orderByChild("timestamp")
        .once("value");

    const values = snapshot.val();

    return (values && Object.values(values)) || [];
};

const filterNewTransactions = async (ref, transactions: Array<Transaction>): Promise<Transaction[]> => {
    const transactionsStored = await getTransactions(ref);
    const existingReferenceNos = transactionsStored.map((txn: Object) => txn["referenceNo"]);
    const newTransactions = transactions.filter((txn: object) => {
        return !existingReferenceNos.includes(txn["referenceNo"]);
    });

    return newTransactions;
};

const storeTransaction = async (ref: string, transaction: Transaction) => {
    // Get a key for a new Post.
    var newTransactionKey = firebase
        .database()
        .ref(ref)
        .child("transactions")
        .push().key;

    const updates = {};
    updates[`/${ref}/transactions/${newTransactionKey}`] = transaction;

    await firebase
        .database()
        .ref()
        .update(updates);
};

const updateSummary = async (ref: string, amount: number) => {
    const updates = {};
    updates[`/${ref}/total_amount`] = amount;
    updates[`/${ref}/timestamp`] = moment().unix();

    await firebase
        .database()
        .ref()
        .update(updates);
};

export const storeTransactions = async (ref: string, requestData: RequestData) => {
    const app = initializeApp();
    const newTransactions = await filterNewTransactions(ref, requestData.transactions);

    if (newTransactions.length === 1) {
        log(`No new transactions to store`);
        return;
    }

    log(`Storing ${newTransactions.length} new transactions.`);
    // store new transactions
    await Promise.all(
        newTransactions.map((txn: Transaction) => {
            return storeTransaction(ref, txn);
        })
    );

    // TODO: can use newTransactions to send notifications about new transactions

    await updateSummary(ref, requestData.total_amount);
};
