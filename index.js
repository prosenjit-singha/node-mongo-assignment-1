const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const app = express();
const port = process.env.PORT || 5000;
// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/user", userRoute);

app.listen(port, () => console.log("Server is running on port -", port));
