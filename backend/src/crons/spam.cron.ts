import { CronJob } from "cron";
import { User } from "../models/user.model";
import { emailService } from "../services/email.service";
import { emailConstants } from "../constants/email.constants";
import { EmailEnum } from "../enums/email.enum";

const handler = async () => {
    const users = await User.find();

    for (let user of users) {
        const userName = user.name;
        const email = user.email;
        await emailService.sendEmail(email, emailConstants[EmailEnum.SPAM], {
            name: userName,
        });
    }

};

export const spanCron = new CronJob("* * * * * *", handler);