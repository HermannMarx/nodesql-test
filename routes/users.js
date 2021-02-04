const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM users WHERE id=$1;", [id])
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, last, age } = req.body;

  pool
    .query(
      "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;",
      [name, last, age, id]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    });
});

router.post("/", (req, res) => {
  const { name, last, age } = req.body;

  pool
    .query(
      "INSERT INTO users(first_name, last_name, age) values($1, $2, $3);",
      [name, last, age]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.get("/", async (req, res) => {
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
    res.status(500).send("Something happened, Hermann");
  }
});

router.get("/:id", async (req, res) => {
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

module.exports = router;
