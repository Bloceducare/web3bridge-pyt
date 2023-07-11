import { userEmail, webPayment } from '../../config';
import { PaymentStatus, Tracks } from '../../enums';
import { sendEmail } from '../../mailer';
import trainingsModel from '../../trainings/db';
import { CustomError } from '../../utils';

export const updateUserPayment = async (result) => {
  try {
    const { specialClass, web2, web3 } = await trainingsModel();
    let tracks = {
      specialClass,
      web2,
      web3,
    };

    const track = result?.data?.meta?.track;
    const userDb = tracks[track];

    if (!userDb) {
      throw new CustomError('track not found', 404);
    }
    const email = result?.data?.customer?.email;
    if (!email) {
      throw new CustomError('customer email not found', 404);
    }
    // user details
    const userDetails = await userDb.findOne({ email });

    // check if user exists
    if (!userDetails?._id) {
      throw new CustomError('user not found', 404);
    }

    if (!userDetails.currentTrack) {
      throw new CustomError('track not found', 404);
    }

    // check if payment is already successful
    if (userDetails.paymentStatus === PaymentStatus.success) {
      throw new CustomError('payment already verified', 423);
    }

    let expectedAmount = 0;
    const expectedCurrency = 'NGN';

    if (track === Tracks.web2 || track === Tracks.web3) {
      expectedAmount = webPayment.naira;
    }

    if (expectedAmount === 0) {
      throw new CustomError('amount can not be zero', 429);
    }

    if (result.data.amount >= expectedAmount && result.data.currency === expectedCurrency) {
      // Success! Confirm the customer's payment
      // update user payment status
      const [, ,] = await Promise.all<any>([
        userDb.updateOne(
          { email },
          {
            $set: { paymentStatus: PaymentStatus.success },
          },
        ),

        sendEmail({
          email,
          name: userDetails.name,
          type: userDetails.currentTrack,
          currentTrack: userDetails.currentTrack,
          file: userEmail?.[userDetails?.currentTrack],
          userDb,
        }),
      ]);

      return { code: 201, message: 'payment verified', status: true };
    }

    throw new CustomError('Payment not valid', 429);
  } catch (e) {
    throw e;
  }
};
