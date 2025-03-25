import nodemailer, { Transporter } from "nodemailer";
import fs from "node:fs/promises";
import handlebars from "handlebars";
import { config } from "../configs/config";
import * as path from "node:path";

class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.EMAIL_USER,
                pass: config.EMAIL_PASSWORD,
            },
        });
    }

    private async _renderTemplate(templateName: string, context: Record<string, any>): Promise<string> {
        const layoutSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", "base.hbs"),
            "utf-8",
        );
        const layoutTemplate = handlebars.compile(layoutSource);
        const templateSource = await fs.readFile(
            path.join(process.cwd(), "src", "templates", `${templateName}.hbs`, "utf8"),
        );
        const childTemplate = handlebars.compile(templateSource);
    }

    public async sendEmail(): Promise<void> {
        await this.transporter.sendMail({
            to: "mykhailo.maietskyi.meoek.2024@lpnu.ua",
            subject: "Hello World!",
            text: "Hello from nodemailer",
        });
    }
}

export const emailService = new EmailService();