import { User, AccountSummary, Transaction } from "./models";

export const user: User = {
    username: "kiorq",
    password: "password",
    disabled: false
};

export const account_summary: AccountSummary = {
    account_name: "Admin spendings",
    last_checked_timestamp: 1000000,
    total_amount: 174.34,
    currency: "KYD"
};

export const transactions: Array<Transaction> = [
    {
        description: "some random purchase",
        date: "2019-20-12",
        timestamp: 1000000,
        amount: 174.34,
        type: "debit"
    }
];
