const express = require("express");
const users = require("./routes/users");
const orders = require("./routes/orders");

const pool = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

app.get("/users", users);

app.get("/users/:id", users);

app.get("/orders", orders);

app.get("/orders/:id", orders);

app.listen(port, () => console.log(`Server running on port ${port}`));
