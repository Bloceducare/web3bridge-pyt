import daoModels from '../db';
import { CustomError } from '../../utils';

export const updateDaoPayments = async (result) => {
  try {
    const { payments, users } = await daoModels();
    const expectedCurrency = 'USD';
    const currentDate = Date.now();

    const email = result?.data?.customer?.email;
    const amount = +result.data?.amount;
    const txnId = String(result?.data?.flw_ref + currentDate);
    if (!email) {
      throw new CustomError('customer email not found', 404);
    }

    // user details
    let userDetails = await users.findOne({ email });

    if (result.data.currency === expectedCurrency) {
      // Success! Confirm the customer's payment
      // update or create user plus payment status
      // create new transaction entry

      const userUpdates = userDetails?._id
        ? users.findOneAndUpdate(
            { email },
            {
              $set: { amount: Number(userDetails?.amount) + amount },
              $push: {
                transactionId: {
                  txnId: txnId,
                  amount,
                  date: currentDate,
                },
              },
            },
          )
        : users.create({
            ...result?.data?.meta,
            email,
            amount,
            ...(!!result.data?.meta?.walletAddress && { walletAddress: result.data?.meta?.walletAddress }),
            transactionId: [
              {
                ...(result.data?.meta?.walletAddress && { user: result.data?.meta?.walletAddress }),
                txnId,
                amount,
                date: currentDate,
              },
            ],
          });
      const paymentDetails = payments.findOne({ txnId });
      const paymentUpdates = paymentDetails?._id
        ? new Promise((res) => res(0))
        : payments.create({
            ...(result.data?.meta?.walletAddress && { user: result.data?.meta?.walletAddress }),
            txnId,
            amount,
            email,
            date: currentDate,
          });

      const [, ,] = await Promise.all<any>([userUpdates, paymentUpdates]);

      return { code: 201, message: 'payment verified', status: true };
    }

    throw new CustomError('Payment not valid', 429);
  } catch (e) {
    console.log(e, 'ERROR****');
    throw e;
  }
};
