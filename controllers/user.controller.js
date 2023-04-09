// const users = require("../data/users.json");
const fs = require("fs");

module.exports.getARandomUser = () => {};

module.exports.getTheAllUsers = (_req, res) => {
  const users = JSON.parse(fs.readFileSync("data/users.json"));
  res.json(users);
};

module.exports.createAnUser = () => {};

module.exports.updateAnUser = () => {};

module.exports.updateMultipleUsers = () => {};

module.exports.deleteAnUser = () => {};
