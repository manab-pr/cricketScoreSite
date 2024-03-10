const express = require('express');
const router = express.Router();

const {
    getAllMatch,
    getScoreCardById
 } = require('../controllers/scorecard');

 router.route('/match').get(getAllMatch)
 router.route('/score/:id').get(getScoreCardById)

 module.exports=router;