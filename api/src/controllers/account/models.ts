// export interface Location {
//     coordinates: [number, number];
//     address: string;
//     timestamp: number;
// }

export interface TransactionModel {
    date: string;
    description: string;
    amount: string;
    type: "debit" | "credit";
    timestamp_received?: number;

    // possible_location?: Location;
}

export interface AccountSummaryModel {
    accountName: string;
    accountTotal: number;
    accountCurrency: string;
    last_updated_timestamp: number;
    transactions: Array<TransactionModel>;
}
