import { JwtModule } from './jwt/jwt.module';
import { MailModule } from './mail/mail.module';

export const infrastructureModules = [
  JwtModule.forRoot({
    privateKey: process.env.SECRET_KEY,
  }),
  MailModule.forRoot({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN_NAME,
    fromEmail: process.env.MAILGUN_FROM_EMAIL,
  }),
];
