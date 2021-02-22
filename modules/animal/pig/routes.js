const router = require("express").Router();

router.get("/sound", (req, res) => {
  res.send(`oink`);
});

module.exports = router;
