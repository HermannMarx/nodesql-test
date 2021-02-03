const express = require("express");
const users = require("./routes/users");
const orders = require("./routes/orders");

const pool = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

app.use("/users", users);

//app.get("/users/:id", users);

//app.delete("users/:id", users);

app.use("/orders", orders);

//app.get("/orders/:id", orders);

app.listen(port, () => console.log(`Server running on port ${port}`));
