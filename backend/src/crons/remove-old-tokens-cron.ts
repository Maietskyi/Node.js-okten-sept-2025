import { config } from "../configs/config";
import { timeHelper } from "../helpers/time.helper";
import { tokenRepository } from "../repositories/token.repository";
import { CronJob } from "cron";

const handler = async () => {
    try {
        const lifeTime = config.JWT_REFRESH_LIFETIME;
        const { value, unit } = timeHelper.parseLifeTime(lifeTime);
        const date = timeHelper.subFromCurrentTime(value, unit);
        const count = await tokenRepository.deleteBeforeDate(date);

        if (count) {
            console.log(`Deleted ${count} old tokens`);
        }
    } catch (err) {
        console.error("e.message");
    }
};

export const removeOldTokens = new CronJob("0 * * * * *", handler);