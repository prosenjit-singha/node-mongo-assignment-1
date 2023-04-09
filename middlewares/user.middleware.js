const requiredKeys = ["id", "name", "gender", "contact", "address", "photoUrl"];
// validate the body and check if all the required properties are present in the body

function checkTypeAndKeys(data, next) {
  for (const key in data) {
    if (key === "id" && typeof data[key] !== "number") {
      next({
        status: 400,
        success: false,
        message: `'${key}' property must be a type of number`,
      });
    } else if (
      key === "name" ||
      key === "gender" ||
      key === "contact" ||
      key === "address" ||
      key === "photoUrl"
    ) {
      if (typeof data[key] !== "string") {
        next({
          status: 400,
          success: false,
          message: `'${key}' property must be a type of string`,
        });
        res.end();
      }
    } else {
      if (requiredKeys.indexOf(key) < 0) {
        next({
          status: 400,
          success: false,
          message: "object properties are not-matching.",
        });
      }
    }
  }
}

module.exports.validateUserType = (req, _res, next) => {
  const body = req.body;

  checkTypeAndKeys(body, next);

  next();
};

module.exports.validateObjectKeys = (req, _res, next) => {
  const body = req.body;

  requiredKeys.forEach((key) => {
    if (body[key] === undefined) {
      next({
        status: 400,
        success: false,
        message: "object properties are missing.",
      });
    }
  });
  next();
};

module.exports.validateMultipleUsersUpdate = (req, _res, next) => {
  const users = req.body;
  users.forEach((user) => checkTypeAndKeys(user, next));
  next();
};
