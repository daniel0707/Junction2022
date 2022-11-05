const express = require("express");
const app = express();
const cors = require("cors");
const { Pool, Client } = require("pg");
const fs = require("fs");
const parse = require('pg-connection-string').parse
require("dotenv").config();
const port = process.env.PORT || 3000;
const postgresqlUri = process.env.CONNECT_STR || "";

//db connection setup
if (postgresqlUri == "") {
  throw "You forgot to add postgresqlUri for database!";
}
const conn = new URL(postgresqlUri);
conn.search = "";
let config = parse(postgresqlUri)
config.ssl={
    ...config.ssl,
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem").toString(),
}
const pool = new Pool(config);


app.use(cors());

app.get("/categories", (req, res, next) => {
  pool.connect();
  pool.query("SELECT * FROM material", [], (err, result) => {
    if (err) {
      console.log(err);
      next(err)
    }else{
        res.send({
            categories:result.rows
        });
    }
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
