import { NextFunction, Request, Response, Router } from "express";
import { getCurrentTimestamp } from "./service";
import db from "./../../db";
import { Transaction } from "./../../db/models";

export default class AccountController {
    /*
     * controller for managing bank account summary and transaction
     */

    constructor(router: Router) {
        router.get("/api/account", this.getAccountSummary);
        router.put("/api/account", this.addTransactions);
    }

    getAccountSummary = (req: Request, res: Response, next: NextFunction) => {
        /*
         * get account summary and transactions
         */
        const summary = db.get("account_summary").value();
        const transactions = db.get("transactions").value();

        return res.json({
            summary,
            transactions
        });
    };

    addTransactions = (req: Request, res: Response, next: NextFunction) => {
        /*
         * updates account summary and add new transactions to account (bulk)
         */

        const reqTransactions: Array<Transaction> = req.body.transactions || [];
        const reqTotalAmount: number = (req.body.total_amount && parseFloat(req.body.total_amount)) || null;

        if (!reqTotalAmount) {
            return res.status(400).json({ error: "total_amount required" });
        }

        if (reqTransactions.length == 0) {
            return res.status(400).json({ error: "cannot update without new transactions" });
        }

        const transactions: Array<Transaction> = reqTransactions.map(
            (txn): Transaction => {
                return { ...txn };
            }
        );

        // add each transaction
        transactions.forEach((txn: Transaction) => {
            db.get("transactions")
                .push(txn)
                .write();
        });
        // update last time checked
        db.set("account_summary.last_checked_timestamp", getCurrentTimestamp()).write();
        db.set("account_summary.total_amount", reqTotalAmount).write();

        return res.json({ success: true });
    };
}
