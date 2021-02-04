const pool = require("../dbconfig");

const verify = async (req, res, next) => {
  const { auth_token } = req.query;
  console.log(auth_token);

  if (auth_token) {
    const tokens = await pool.query("SELECT * FROM token");
    const values = [];
    tokens.rows.map((iteration) => {
      values.push(iteration.value);
    });
    let i = 0;
    values.map((iteration) => {
      if (iteration === auth_token) i = 1;
    });
    if (i === 1) next();
    else res.sendStatus(401);
  } else {
    res.sendStatus(400);
  }
};

module.exports = verify;
