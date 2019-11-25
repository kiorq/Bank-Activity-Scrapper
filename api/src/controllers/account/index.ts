import { NextFunction, Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./service";
import { AccountSummaryModel, TransactionModel } from "./models";

export default class AccountController {
    /*
     * controller for managing bank account summary and transaction
     */
    productDataMap = null;

    constructor(router: Router) {
        this.productDataMap = new Map();

        router.get("/api/account/:accountNumber", this.getAccountSummary);
        router.put("/api/account/:accountNumber", this.updateAccountSummary);
    }

    getAccountSummary = (req: Request, res: Response, next: NextFunction) => {
        /*
         * get account summary and transactions
         */
        const { accountNumber } = req.params;

        if (false) {
            return res.sendStatus(404);
        }

        const accountSummary: AccountSummaryModel = {
            accountName: "Kirk's Spending",
            accountTotal: 1903.3,
            accountCurrency: "KYD",
            last_updated_timestamp: 10000000000,
            transactions: []
        };

        return res.json(accountSummary);
    };

    updateAccountSummary = (req: Request, res: Response, next: NextFunction) => {
        /*
         * updates account summary and add new transactions to account (bulk)
         */

        const { accountNumber } = req.params;
        const accountSummary: AccountSummaryModel = req.body;
        const { accountTotal, transactions } = accountSummary;
        const last_updated_timestamp: number = getCurrentTimestamp();

        return res.json({ success: true });
    };
}
