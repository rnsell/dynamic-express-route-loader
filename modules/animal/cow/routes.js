const router = require("express").Router();

router.get("/sound", (req, res) => {
  res.send(`moo`);
});

module.exports = router;
