import nodemailer from 'nodemailer';

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
  throw new Error('No Email key in environment');
}

const options = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
};

export async function sendEmail(message: {
  to: string;
  from: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport(options);
  return transporter.sendMail(message);
}
