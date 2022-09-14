const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;
const CACHE_SIZE = 4;
const lruCache = require("./LruCache");
const casher = new lruCache(CACHE_SIZE);

// get all cache items
app.get("/", (req: any, res: any) => {
  const values = casher.getAll();
  res.send(values);
});

// get item from cache
app.get("/key=:key", (req: any, res: any) => {
  const { key } = req.params;
  const value = casher.get(key);
  if (value) {
    res.send(value);
  } else {
    res.sendStatus(404);
  }
});

// Insert item to cache
app.post("/", bodyParser.json(), (req: any, res: any) => {
  let { key, value } = req.body;
  casher.put(key, value);
  res.send(`insert ${value}!`);
});

// to automaticly fill the cache
app.get("/fill", (req: any, res: any) => {
  for (let i = 1; i <= CACHE_SIZE; i++) {
    casher.put(`${i}`, `test${i}`);
  }
  res.sendStatus(201);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
