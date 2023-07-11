import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sampleText } from './config';
import { getDaoUsers } from './dao/services/users';
import { getWeb2Users } from './trainings/services/users';
import Payments from './payment/routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  return res.json({
    message: `Welcome visitor ${sampleText}`,
  });
});

app.get('/dao', async (req: Request, res: Response) => {
  const daoUsers = await getDaoUsers();
  return res.json({
    message: daoUsers,
  });
});

app.get('/users', async (req: Request, res: Response) => {
  const web2Users = await getWeb2Users();
  return res.json({
    message: web2Users,
  });
});

app.use(Payments);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
