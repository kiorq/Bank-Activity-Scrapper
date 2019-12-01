export type Config = {
    browser: {
        headless: number;
    };
    debug: {
        enable: string;
    };
    bank: {
        username: string;
        password: string;
        account_position: number;
    };
    store: {
        key: string;
    };
    email: {
        login: string;
        password: string;
    };
};
