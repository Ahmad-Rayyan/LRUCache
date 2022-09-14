const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const lruCache = require("./LruCache");
const casher = new lruCache(4);

app.get("/", (req: any, res: any) => {
  const values = casher.getAll();
  res.send(values);
});

app.get("/key=:key", (req: any, res: any) => {
  const { key } = req.params;
  const value = casher.get(key);
  if (value) {
    res.send(value);
  } else {
    res.sendStatus(404);
  }
});

app.post("/", bodyParser.json(), (req: any, res: any) => {
  console.log("body", req.body);
  let { key, value } = req.body;
  casher.put(key, value);
  res.send(`insert ${value}!`);
});

app.get("/fill", (req: any, res: any) => {
  for (let i = 0; i < 5; i++) {
    casher.put(`${i}`, `test${i}`);
  }
  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
