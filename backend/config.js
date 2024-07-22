
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export default {
  port: process.env.PORT || 5050,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.your-email-provider.com',
    port: process.env.SMTP_PORT || 587,
    user: process.env.SMTP_USER || 'your_email@example.com',
    pass: process.env.SMTP_PASS || 'your_email_password'
  },
  nodeEnv: process.env.NODE_ENV || 'development'
};
