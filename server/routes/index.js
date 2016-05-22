const express = require('express');
const router = express.Router();


router.get('/', (req, res)=> {
    "use strict";
    res.status(200).render("index");
});


module.exports = router;