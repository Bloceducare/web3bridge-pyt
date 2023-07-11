import dotenv from 'dotenv';
import { isDev } from '../../config';
import { updateUserPayment } from '../../trainings/controller';
import { updateDaoPayments } from '../../dao/controller';

dotenv.config();
const PaymentPck = require('flutterwave-node-v3');
const pyt = new PaymentPck(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);

export const processPayment = async (req, res) => {
  req.body = isDev ? req.body : req.body.data;
  const sentData = req?.body?.customer?.email;
  const sentId = req?.body?.id;

  if (!sentData || !sentId) {
    return res.status(425).json({
      status: false,
      message: 'not data sent',
      data: req.body,
    });
  }

  const secretHash = process.env.PYT_SECRET_HASH;
  const signature = req.headers['verif-hash'];
  if (signature !== secretHash) {
    return res.status(401).json({
      error: 'hash not math',
    });
  }

  const { customer: { email = '' } = {} } = req.body;

  try {
    const payload = req.body;

    // verify payment status
    const result = await pyt.Transaction.verify({
      id: String(payload.id),
    });

    if (result.data.status !== 'successful') {
      return res.status(403).json({ status: false, message: 'payment not valid' });
    }
    // Payment is now valid
    const paymentFor = result?.data?.meta?.paymentFor;

    if (paymentFor == 'trainings') {
      const { code, message, status } = await updateUserPayment(result);
      return res.status(code).json({ status, message });
    }

    if (paymentFor == 'dao') {
      const { code, message, status } = await updateDaoPayments(result);
      return res.status(code).json({ status, message });
    }

    return res.status(404).json({
      message: 'unknown payment',
      status: false,
    });
  } catch (e: any) {
    return res.status(e?.statusCode ?? 500).json({
      error: {
        message: e?.message ?? 'Server error',
      },
    });
  }
};
