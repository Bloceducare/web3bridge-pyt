const daoDB = process.env.DAO_DB;
const {connectDatabase} = require("../utils");
const {UserModel, PaymentModel} = require("web3bridgemodels/dist/dao");

const daoModels = async () => {
  const connection = await connectDatabase(daoDB);
  return {
    users: connection.model('user', UserModel),
    payments: connection.model('transaction', PaymentModel),
  };
};

module.exports = {
  daoModels,
};

