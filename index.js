const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const app = express();
const port = process.env.PORT || 5000;
// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

// default error handler
app.use((err, _req, res, next) => {
  console.log({ err });
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render("error", { error: err });
});

app.listen(port, () => console.log("Server is running on port -", port));
