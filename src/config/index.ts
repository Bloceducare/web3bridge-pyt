require('dotenv').config(); // load .env variables

export const daoDB = process.env.DAO_DB;
export const trainingsDB = process.env.TRAININGS_DB;
export const isDev = process.env.NODE_ENV === 'development';

export const CURRENT_COHORT = 'IX';

export const webPayment = {
  naira: isDev ? 10 : 10000,
  USD: 70,
};
export const mailSenderConfig = {
  from: { email: 'registration@web3bridge.com', name: 'Web3bridge' },
  emailSubject: 'Acceptance Email',
  subject: 'Application Received',
  replyTo: 'registration@web3bridge.com',
};

export const emailConfig = {
  sender: 'registration@web3bridge.com',
  name: 'Web3Bridge',
  replyTo: {
    email: 'registration@web3bridge.com',
    name: 'Support',
  },
};

export const userEmail = {
  web2: 'web2',
  web3: 'web3',
  specialClass: {
    1: 'webemail',
    2: 'webemail',
    3: 'webemail',
    4: 'webemail',
    5: 'webemail',
  },
};

export const sampleText = 'JO';
