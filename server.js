const express = require("express");
const path = require("path");
const app = express();
const loader = require("./express-meal");
const { PORT = 3000 } = process.env;

const router = loader.getRouter({
  cwd: path.join(__dirname, "./modules"),
  glob: "**/*routes*.js",
});

app.use(router);

app.use("/", (req, res) => {
  res.json("Hello world");
});

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}/`);
});
