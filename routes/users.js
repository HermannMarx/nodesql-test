const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");
//const studentsController = require("../controllers/students");
//const getAllPosts = require("../../controllers/allPosts");

router.delete("/:id", (req, res) => {
  const { id } = req.params; // We retrieve the id from the URL

  pool
    .query("DELETE FROM users WHERE id=$1;", [id]) // We inject the id in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    }); // In case of problem we send an HTTP code
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, last, age } = req.query;

  pool
    .query(
      "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;",
      [name, last, age, id]
    ) // We inject the name and id in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => {
      res.sendStatus(404);
      console.log(e);
    }); // In case of problem we send an HTTP code
});

router.post("/", (req, res) => {
  const { name, last, age } = req.query; // We retrieve the id from the form (body-parser)

  //console.log(req);
  console.log(req.query);
  console.log(req.query.name);
  console.log(req.query.last);
  console.log(req.query.age);

  pool
    .query(
      "INSERT INTO users(first_name, last_name, age) values($1, $2, $3);",
      [name, last, age]
    ) // We inject the name in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
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
