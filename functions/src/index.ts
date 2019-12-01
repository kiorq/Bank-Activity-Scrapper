import * as functions from "firebase-functions";
import scrapperRun from "./scrapper/app";

const config: any = functions.config();

const runtimeOpts: any = {
    timeoutSeconds: 300,
    memory: "1GB"
};

export const ScrapeBankActivity = functions
    .runWith(runtimeOpts)
    .pubsub.schedule("every 15 minutes")
    .onRun(context => {
        return scrapperRun(config);
    });
