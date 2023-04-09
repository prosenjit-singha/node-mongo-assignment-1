// const us = require("../data/users.json");
const usersPath = __dirname + "/../data/users.json";
const fs = require("fs");
const arr = require("../utils/array");

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

module.exports.getTheAllUsers = async (req, res, next) => {
  const { limit } = req.query;

  try {
    await fs.readFile("data/users.json", (err, data) => {
      if (err) {
        res.sendStatus(500);
        res.end();
      } else {
        const range = parseInt(limit);
        if (limit && isNaN(range)) {
          next({
            status: 400,
            success: false,
            message: "limit must be a number",
          });
        } else {
          res.json(JSON.parse(data).slice(0, limit));
          res.end();
        }
      }
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports.createAnUser = (req, res, next) => {
  const payload = req.body;

  const users = JSON.parse(fs.readFileSync(usersPath));

  const isExist = users.find((user) => user.id === payload.id);

  if (!!isExist) {
    next({
      status: 406,
      success: false,
      message: "user id already exist",
    });
  } else {
    users.push(payload);

    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

    res.json({
      success: true,
      status: 200,
    });
  }
};

module.exports.updateAnUser = (req, res) => {
  const payload = req.body;
  const userId = payload.id;
  const users = JSON.parse(fs.readFileSync(usersPath));

  let updatedUsers = [];
  let updated = false;
  for (const user of users) {
    if (userId === user.id) {
      updatedUsers.push({ ...user, ...payload });
      updated = true;
    } else {
      updatedUsers.push(user);
    }
  }
  fs.writeFileSync(usersPath, JSON.stringify(updatedUsers, null, 2));

  if (updated) {
    res.json({
      status: 200,
      success: true,
    });
  } else {
    res.status(406).json({
      status: 406,
      success: false,
      message: `${userId} not found!`,
    });
  }
};

module.exports.updateMultipleUsers = (req, res) => {
  let payload = req.body; // array of objects
  const users = JSON.parse(fs.readFileSync(usersPath));

  let updatedUsers = [];
  let updatedIds = []; // updated ids

  for (const user of users) {
    let updated = false;

    for (const userNewInfo of payload) {
      if (userNewInfo.id === user.id) {
        updatedUsers.push({ ...user, ...userNewInfo });
        updatedIds.push(user.id);
        updated = true;
        break;
      }
    }
    if (!updated) updatedUsers.push(user);
  }

  fs.writeFileSync(usersPath, JSON.stringify(updatedUsers, null, 2));

  res.json({
    status: 200,
    success: true,
    updatedIds,
  });
};

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
  fs.writeFileSync(usersPath, JSON.stringify(updatedUsers, null, 2));

  if (updatedUsers.length < users.length) {
    res.json({
      status: 200,
      success: true,
    });
  } else {
    res.status(406).json({
      status: 406,
      success: false,
      message: `${userId} not found!`,
    });
  }
};

module.exports.test = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersPath));
  // console.log(usersPath);
  res.json(users);
};
