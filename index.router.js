const express = require('express');
const router = express.Router();

const HealthController = require('./controllers/health');
const SuggestionsController = require('./controllers/suggestions');
const CountController = require('./controllers/count');
const ListController = require('./controllers/list');


router.get('/health', HealthController);

router.get('/suggestions', SuggestionsController);

router.get('/count', CountController);

router.get('/list/:entity', ListController);

module.exports = router;
