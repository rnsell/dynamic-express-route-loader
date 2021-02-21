const router = require("express").Router();

router.get("/sound", (req, res) => {
  res.send(`cluck`);
});

module.exports = router;
