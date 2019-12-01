import * as functions from "firebase-functions";
import scrapperRun from "./scrapper/app";

const config: any = functions.config();

export const ScrapeBankActivity = functions.pubsub.schedule("every 15 minutes").onRun(context => {
    return scrapperRun(config);
});
