// const users = require("../data/users.json");
const usersPath = "data/users.json";
const fs = require("fs");
const arr = require("../utils/array");
const errors = require("../helpers/errors");

module.exports.getARandomUser = async (_req, res) => {
  try {
    await fs.readFile(usersPath, (err, data) => {
      if (err) {
        res.sendStatus(500);
        res.end();
      } else {
        const users = JSON.parse(data);
        const user = arr.getRandomElement(users);
        res.json(user);
        res.end();
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

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

module.exports.createAnUser = (req, res) => {
  const payload = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath));

  users.push(payload);

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

  res.json({
    success: true,
    status: 200,
  });
};

module.exports.updateAnUser = (req, res) => {
  const payload = req.body;
  const userId = payload.id;
  const users = JSON.parse(fs.readFileSync(usersPath));

  let updatedUsers = [];
  for (const user of users) {
    if (userId === user.id) {
      updatedUsers.push({ ...user, ...payload });
    } else {
      updatedUsers.push(user);
    }
  }
  fs.writeFileSync(usersPath, updatedUsers);

  if (updatedUsers.length > users.length) {
    res.json({
      status: 200,
      success: true,
    });
  } else {
    res.status(400).json({
      status: 400,
      success: false,
    });
  }
};

module.exports.updateMultipleUsers = () => {};

module.exports.deleteAnUser = (req, res) => {
  const userId = req.body.id;
  const users = JSON.parse(fs.readFileSync(usersPath));

  let updatedUsers = [];
  for (const user of users) {
    if (userId === user.id) {
      continue;
    } else {
      updatedUsers.push(user);
    }
  }
  fs.writeFileSync(usersPath, updatedUsers);

  if (updatedUsers.length < users.length) {
    res.json({
      status: 200,
      success: true,
    });
  } else {
    res.status(400).json({
      status: 400,
      success: false,
    });
  }
};
