const {connectDB} = require("web3bridgemodels/dist");

const connectDatabase = async (url) => {
  return await connectDB(url);
};


module.exports = {
  connectDatabase,
};


