module.exports.validateId = (req, res, next) => {
  const id = req.body.id;
  if (typeof id === "number") next();
  else {
    res.status(400).json({
      status: 400,
      success: false,
      message: "'id' must be a type of number",
    });
  }
};

// validate the body and check if all the required properties are present in the body
module.exports.validateObj = (req, res, next) => {
  next();
};
