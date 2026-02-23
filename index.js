const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Boutik ap mache!');
});

module.exports = router;
