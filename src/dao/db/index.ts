import { daoDB } from '../../config';
import { connectDatabase } from '../../utils';
import { UserModel, PaymentModel } from 'web3bridgemodels/dist/dao';

const daoModels = async () => {
  const connection = await connectDatabase(daoDB);
  return {
    users: connection.model('user', UserModel),
    payments: connection.model('transaction', PaymentModel),
  };
};

export default daoModels;
