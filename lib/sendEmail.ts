import nodemailer from 'nodemailer';

if (!process.env.GOOGLE_USER || !process.env.GOOGLE_APP_PASSWORD) {
  throw new Error('No Email key in environment');
}

const options = {
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_USER,
    pass: process.env.GOOGLE_APP_PASSWORD,
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
