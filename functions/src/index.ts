import * as functions from "firebase-functions";
import scrapperRun from "./scrapper/run";

export const scheduledFunction = functions.pubsub.schedule("every 15 minutes").onRun(async context => {
    await scrapperRun();
    return null;
});
