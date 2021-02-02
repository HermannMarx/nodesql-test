const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");
//const studentsController = require("../controllers/students");
//const getAllPosts = require("../../controllers/allPosts");

router.get("/users", async (req, res) => {
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

router.get("/users/:id", async (req, res) => {
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
