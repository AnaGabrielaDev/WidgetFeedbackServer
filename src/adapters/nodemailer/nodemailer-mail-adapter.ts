import { mailAdapter, SendMailData } from "../mail-adapters";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7517826494e12",
    pass: "af7d24b363c93c"
  }
});

export class NodemailerMailAdapter implements mailAdapter {
  async sendMail({subject, body}: SendMailData){
    await transport.sendMail({
      from: 'Team Feedget <support@feedget.com>',
      to: 'Ana Gaby <test@gmail.com>',
      subject,
      html: body, 
    });
  };
}