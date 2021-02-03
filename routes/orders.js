const express = require("express");
const router = express.Router();

const pool = require("../dbconfig");

router.get("/", async (req, res) => {
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

router.get("/:id", async (req, res) => {
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
    res.status(500).send("Something happened,Hermann");
  }
});

router.post("/", (req, res) => {
  const { price, date, user_id } = req.query;

  pool
    .query("INSERT INTO orders(price, date, user_id) values($1, $2, $3);", [
      price,
      date,
      user_id,
    ])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.query;

  pool
    .query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING*;",
      [price, date, user_id, id]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM orders WHERE id=$1;", [id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

module.exports = router;
