import express from 'express'; 
import nodemailer from 'nodemailer'; 
import { prisma } from './prisma';

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "e7517826494e12",
    pass: "af7d24b363c93c"
  }
});

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  });

  await transport.sendMail({
    from: 'Team Feedget <support@feedget.com>',
    to: 'Ana Gaby <test@gmail.com>',
    subject: 'New Feedback',
    html: [
      '<div style="font-family: sans-serif; font-size: 16px; color: #111">',
      `<p>Type of Feedback: ${type}</p>`,
      `<p>Comment: ${comment}</p>`
    ].join('\n') 
  });

  return res.status(201).json({ data: feedback });
});




app.listen(3333, ()=> {
  console.log("rodandoooo")
});
