const router = require('express').Router();
const { authenticator } = require('../middleware/authenticator');

router.post('/', authenticator);

module.exports = router;

// 토큰기간만료됐거나, 둘중하나 없을때 재발급해주는거