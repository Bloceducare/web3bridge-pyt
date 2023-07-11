import daoModels from '../db';

export const getDaoUsers = async () => {
  const { users } = await daoModels();
  return await users.find();
};
