"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountController {
    constructor(router) {
        this.productDataMap = null;
        this.getAccountSummary = (req, res, next) => {
            const { accountNumber } = req.params;
            if (false) {
                return res.sendStatus(404);
            }
            const accountSummary = {
                accountName: "Kirk's Spending",
                accountTotal: 1903.3,
                accountCurrency: "KYD",
                last_updated_timestamp: 10000000000,
                transactions: []
            };
            return res.json(accountSummary);
        };
        this.updateAccountSummary = (req, res, next) => {
            const { accountNumber } = req.params;
            const accountSummary = req.body;
            const { accountTotal, transactions } = accountSummary;
            const last_updated_timestamp = Math.floor(new Date() / 1000);
            return res.json({ success: true });
        };
        this.productDataMap = new Map();
        router.get("/api/account/:accountNumber", this.getAccountSummary);
        router.put("/api/account/:accountNumber", this.updateAccountSummary);
    }
}
exports.default = AccountController;
