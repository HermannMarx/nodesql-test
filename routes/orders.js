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
  const { price, date, user_id } = req.query; // We retrieve the id from the form (body-parser)

  //console.log(req);
  console.log(req.query);
  console.log(req.query.price);
  console.log(req.query.date);
  console.log(req.query.user_id);

  pool
    .query("INSERT INTO orders(price, date, user_id) values($1, $2, $3);", [
      price,
      date,
      user_id,
    ]) // We inject the name in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.query; // We retrieve the id from the form (body-parser)

  //console.log(req);
  console.log(req.query);
  console.log(req.query.price);
  console.log(req.query.date);
  console.log(req.query.user_id);
  //UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;
  pool
    .query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING*;",
      [price, date, user_id, id]
    ) // We inject the name in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  //const { price, date, user_id } = req.query; // We retrieve the id from the form (body-parser)
  pool
    .query("DELETE FROM orders WHERE id=$1;", [id]) // We inject the name in the request
    .then((data) => res.status(201).json(data))
    .catch((e) => res.sendStatus(404)); // In case of problem we send an HTTP code
});

module.exports = router;
