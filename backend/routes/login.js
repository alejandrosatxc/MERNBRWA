const router = require('express').Router();

router.route('/').post((req, res) => {
    res.send({
        token: 'test123'
    });
});

router.route('/').get((req, res) => {
    res.send({
        token: 'test123'
    });
});

module.exports = router;