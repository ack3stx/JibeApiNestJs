import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const MailerConfig = MailerModule.forRoot({
  transport: {
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  },
  defaults: {
    from: '"No Reply" <no-reply@example.com>',
  },
});