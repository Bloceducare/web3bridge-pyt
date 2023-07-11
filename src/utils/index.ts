import { connectDB } from 'web3bridgemodels/dist';

export const connectDatabase = async (url) => {
  return await connectDB(url);
};

export class CustomError extends Error {
  statusCode: number;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
