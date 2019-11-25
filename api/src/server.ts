import * as express from "express";
import { Config } from "./config";

// Routes
import AuthController from "./controllers/auth";
import AccountController from "./controllers/account";

export default class Server {
    public app: any;
    public port: number;

    constructor(port = 8008) {
        this.app = express();
        this.port = port;

        Config.set(this.app);

        this.buildRoutes();
    }

    setConfig() {
        Config.set(this.app);
    }

    buildRoutes() {
        const router: express.Router = express.Router();

        this.app.use(router);

        new AuthController(router);
        new AccountController(router);
    }

    public start() {
        this.app.listen(this.port, () => {
            console.log(`Api running on port ${this.port}`);
        });
    }
}
