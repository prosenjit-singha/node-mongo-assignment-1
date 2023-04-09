module.exports.SERVER_ERROR = (msg = "Server Error") => ({
  status: 500,
  success: false,
  name: "server-error",
  message: msg,
});
