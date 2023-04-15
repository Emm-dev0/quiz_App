const express = require('express');
const router = express.Router();
const fetchController = require('../controller/fetch_controller');

router.get('/fetch-data', (req, res) => {
    fetchController.fetchData
});

module.exports = router;