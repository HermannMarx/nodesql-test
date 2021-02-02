const express = require("express");
const dotenv = require("dotenv");
// init of dotenv
dotenv.config();

const pool = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

app.get("/users", async (req, res) => {
  // ES5
  /*pool
    .query("SELECT * FROM orders")
    .then((data) => res.json(data))
    .catch((err) => res.status(500).send("Something happened"));*/
  // ES6
  try {
    const data = await pool.query("SELECT * FROM users");

    res.json({
      code: 200,
      operation: "success",
      description: "Insert new user",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
