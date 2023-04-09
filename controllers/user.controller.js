// const users = require("../data/users.json");
const fs = require("fs");

module.exports.getARandomUser = () => {};

module.exports.getTheAllUsers = async (_req, res) => {
  try {
    await fs.readFile("data/users.json", (err, data) => {
      if (err) {
        res.sendStatus(500);
        res.end();
      } else {
        res.json(JSON.parse(data));
        res.end();
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports.createAnUser = () => {};

module.exports.updateAnUser = () => {};

module.exports.updateMultipleUsers = () => {};

module.exports.deleteAnUser = () => {};
