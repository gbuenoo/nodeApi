const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {     
    return res.send({message: `It's working!`})
})

router.post('/', (req, res) => {     
    return res.send({message: `It's working!`})
})

module.exports = router;