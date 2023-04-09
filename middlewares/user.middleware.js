const requiredKeys = ["id", "name", "gender", "contact", "address", "photoUrl"];
// validate the body and check if all the required properties are present in the body
module.exports.validateUserType = (req, res, next) => {
  const body = req.body;

  for (const key in body) {
    if (key === "id" && typeof body[key] !== "number") {
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
      if (typeof body[key] !== "string") {
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

  next();
};

module.exports.validateObjectKeys = (req, res, next) => {
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
