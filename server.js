const express = require("express");
const users = require("./routes/users");
const orders = require("./routes/orders");

const pool = require("./dbconfig");

const { PORT } = process.env;

const app = express();
const port = PORT;

app.get("/users", users);

app.get("/users/:id", users);

app.get("/orders", orders);

app.get("/orders/:id", orders);

app.delete("/users/delete/:id", (req, res) => {
  const { id } = req.params.id;
  try {
    const data = pool.query("DELETE FROM users WHERE id=$1", [id]);

    res.json({
      code: 201,
      operation: "success",
      description: "Deleted order by id",
      data: data.rows,
    });
  } catch (e) {
    console.error(Error(e));
    res.status(500).send("Something happened");
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
