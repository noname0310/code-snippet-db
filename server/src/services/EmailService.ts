
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { EmailCheck } from '../entities/EmailCheck';
import { CLIENT_ADDR, EMAIL_VERIFY_TIMEOUT } from '../const';

const emailCheckEmailTemplate = fs.readFileSync(path.resolve(__dirname, '../assets/email-templates/email-check.ejs'), 'utf-8');
const emailChangeEmailTemplate = fs.readFileSync(path.resolve(__dirname, '../assets/email-templates/email-change.ejs'), 'utf-8');
const passwordResetEmailTemplate = fs.readFileSync(path.resolve(__dirname, '../assets/email-templates/password-reset.ejs'), 'utf-8');

export class EmailService {
    constructor(
        private readonly transporter: nodemailer.Transporter
    ) {}
    
    async sendEmail({ subject, html, text }: { subject: string, html: string, text: string }, to: string) {
        return await this.transporter.sendMail({
            from: '"AUTH" <auth@the-world.space>',
            to,
            subject,
            text,
            html
        });
    }

    async addEmailCheck(email: string, verifyId: string, uuid: string | undefined = undefined) {
        const emailCheck = new EmailCheck();
        emailCheck.email = email;
        emailCheck.verifyId = verifyId;
        emailCheck.verified = false;

        if(uuid !== undefined)
            emailCheck.id = uuid;

        await emailCheck.save();
        
        setTimeout(async () => {
            await emailCheck.remove();
        }, EMAIL_VERIFY_TIMEOUT);

        return emailCheck;
    }

    async sendEmailCheckEmail(verifyId: string, to: string) {
        await this.sendEmail({
            subject: 'Email check',
            text: 'Email check',
            html: ejs.render(emailCheckEmailTemplate, { verifyId })
        }, to);
    }
    async sendResetPasswordEmail(emailCheckId: string, verifyId: string, to: string) {
        const passwordResetLink = CLIENT_ADDR + '/password/reset?verifyId=' + encodeURIComponent(verifyId) + '&emailCheckId=' + encodeURIComponent(emailCheckId);

        await this.sendEmail({
            subject: 'Password reset',
            text: 'Password reset',
            html: ejs.render(passwordResetEmailTemplate, { passwordResetLink })
        }, to);
    }
    async sendEmailChangeEmail(verifyId: string, to: string) {
        await this.sendEmail({
            subject: 'Email change',
            text: 'Email check',
            html: ejs.render(emailChangeEmailTemplate, { verifyId })
        }, to);
    }
    async sendAccountFindEmail(verifyId: string, to: string) {
        await this.sendEmail({
            subject: 'Email change',
            text: 'Email check',
            html: ejs.render(passwordResetEmailTemplate, { verifyId })
        }, to);
    }
}
