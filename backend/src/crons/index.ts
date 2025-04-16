// import { testCron } from "./test.cron";

import { removeOldTokens } from "./remove-old-tokens-cron";
import { spanCron } from "./spam.cron";

export const cronRunner = () => {
    // testCron.start();
    removeOldTokens.start();
    spanCron.start();
};