import sendgrid from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
} else {
  throw new Error('No sendgrid API key in environment');
}

export async function sendEmail(message: {
  to: string;
  from: string;
  subject: string;
  text: string;
  html?: string;
}) {
  return sendgrid.send(message);
}
