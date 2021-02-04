const express = require("express");
const router = express.Router();

const verify = require("../controllers/tokenController");
const pool = require("../dbconfig");

router.get("/", verify, async (req, res) => {
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

router.get("/:id", verify, async (req, res) => {
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

router.post("/", verify, (req, res) => {
  const { price, date, user_id } = req.body;
  console.log(req.body);

  pool
    .query("INSERT INTO orders(price, date, user_id) values($1, $2, $3);", [
      price,
      date,
      user_id,
    ])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.put("/:id", verify, (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  pool
    .query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING*;",
      [price, date, user_id, id]
    )
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

router.delete("/:id", verify, (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM orders WHERE id=$1;", [id])
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404));
});

module.exports = router;
