const express = require("express");
const cookieParser = require('cookie-parser');
const path = require("path");
const UserModel = require("./models/users");
const routes1=require("./routes/routes.js");
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes1);



app.listen(PORT, () => {
  console.log(`Server Started at: ${PORT}`);
});
