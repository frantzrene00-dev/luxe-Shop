const express = require('express');
const router = express.Router();

// Example route
router.get('/', (req, res) => {
  res.send('Boutik ou ap mache!');
});

module.exports = router;
