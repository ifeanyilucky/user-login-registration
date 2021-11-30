const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { MONGODB_URI } = require("./config");
const RegisterRoute = require("./routes/api/register");
const LoginRoute = require("./routes/api/login");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// MONGODB CONNECTION
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(`Error is: ${err}`);
  });

app.use("/", express.static(path.join(__dirname, "static")));
app.use("/api/register", RegisterRoute);
app.use("/api/login", LoginRoute);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
