const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const { PORT } = process.env;
const port = PORT;

const pool = require("./dbconfig");

const users = require("./routes/users");
const orders = require("./routes/orders");

app.use("/users", users);
app.use("/orders", orders);

app.listen(port, () => console.log(`Server running on port ${port}`));
