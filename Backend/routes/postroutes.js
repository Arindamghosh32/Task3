const express = require('express');

const{createPost} = require('./../controller/postController');
const router = express.Router();

router.get("/",createPost);

module.exports = router;