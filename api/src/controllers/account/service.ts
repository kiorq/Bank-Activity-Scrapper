const moment = require("moment");

export const getCurrentTimestamp = (): number => moment().unix();
