const users = require("../data/users.json");

module.exports.getARandomUser = () => {};

module.exports.getTheAllUsers = (_req, res) => {
  res.json(users);
};

module.exports.createAnUser = () => {};

module.exports.updateAnUser = () => {};

module.exports.updateMultipleUsers = () => {};

module.exports.deleteAnUser = () => {};
