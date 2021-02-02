const express = require("express");
const dotenv = require("dotenv");
// init of dotenv
dotenv.config();

const pool = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

app.get("/users", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");

    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all users",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * FROM users WHERE id=$1", [id]);

    res.json({
      code: 200,
      operation: "success",
      description: "Fetched user by id",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM orders");

    res.json({
      code: 200,
      operation: "success",
      description: "Fetched all orders",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.get("/orders/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const data = await pool.query("SELECT * FROM orders WHERE id=$1", [id]);

    res.json({
      code: 200,
      operation: "success",
      description: "Fetched order by id",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
