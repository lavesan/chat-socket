var express = require('express');
var router = express.Router();
const { getMsgs } = require('../services');

/* GET chats. */
router.get('/', async function(req, res, next) {
    const msgs = await getMsgs();
    res.json(msgs);
});

module.exports = router;