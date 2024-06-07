const express = require('express');
const { filtrarPastasHandler } = require('../controllers/pasta.js');

const router = express.Router();

router.get('/', filtrarPastasHandler);

module.exports = router;
