import nodemailer from "nodemailer";
import { config } from "../../config";
import { EmailOptions }  from "../models/email.model";

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: config.email,
                pass: config.pass,
            },
        });
    }

    public async sendEmailWithGeneratedPassword(to: string, password: string ): Promise<void> {
        const mailOptions: EmailOptions = {
            from: config.email,
            to,
            subject: 'Wygenerowane hasło',
            text: `Oto twoje nowe hasło: ${password}.`,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log('Email sent succesfully!');
        } catch (error) {
            console.error('Error while sending email!', error);
            throw new Error('Error while sending email!');
        }
    }
}

export default EmailService;