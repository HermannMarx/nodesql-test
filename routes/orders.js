const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

router.get("/orders", async (req, res) => {
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
    res.status(500).send("Something happened, Hermann");
  }
});

router.get("/orders/:id", async (req, res) => {
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

module.exports = router;
