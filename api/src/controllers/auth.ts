import { NextFunction, Request, Response, Router } from "express";

export default class AuthController {
    constructor(router: Router) {
        router.post("/api/auth", this.login);
    }

    login = (req: Request, res: Response, next: NextFunction) => {
        res.json({
            user_name: "dr_acula",
            first_name: "James",
            last_name: "Acula",
            user_id: "i87fd98sd0971kjl0s"
        });
    };
}
