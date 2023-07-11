import trainingsModel from '../db';

export const getWeb2Users = async () => {
  const { web2 } = await trainingsModel();
  return await web2.find();
};

export const getWeb3Users = async () => {
  const { web3 } = await trainingsModel();
  return await web3.find();
};

export const getSpecialClass = async () => {
  const { specialClass } = await trainingsModel();
  return await specialClass.find();
};
