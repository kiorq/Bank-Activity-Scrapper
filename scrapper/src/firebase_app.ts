import run from "./run";
const functions = require("firebase-functions");

exports.scheduledFunction = functions.pubsub.schedule("every 5 minutes").onRun(async context => {
    return await run();
});
