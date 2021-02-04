const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
const port = PORT;

const pool = require("./dbconfig");

const users = require("./routes/users");
const orders = require("./routes/orders");
const verify = require("./controllers/tokenController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/orders", orders);

app.listen(port, () => console.log(`Server running on port ${port}`));
