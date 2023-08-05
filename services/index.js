const daoModels = require("../db");

const getDaoUsers = async () => {
    const { users } = await daoModels();
    return await users.find();
};

module.exports = {
    getDaoUsers,
};