const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  console.log('logg: method ', req.method);
  next();
});

router.get("/asdf", (req, res, next) => {
  console.log("worked!");
  res.download("./README.MD");
})

module.exports = router;