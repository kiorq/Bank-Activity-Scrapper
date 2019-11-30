export interface Transaction {
    description: string;
    date: string;
    timestamp: number;
    amount: number;
    type: "debit" | "credit";
}

export interface AccountSummary {
    account_name: string;
    last_checked_timestamp: number;
    total_amount: number;
    currency: string;
}

export interface User {
    username: string;
    password: string;
    disabled: boolean;
}
