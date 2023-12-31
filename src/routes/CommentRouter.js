const express = require('express');
const router = express.Router()
const CommentController = require('../controllers/CommentController');
const { authMiddleware } = require('../middleware/authMiddleware');


router.post('/create', CommentController.createComment);
router.get('/get-all-comment/:id', CommentController.getAllComment);



module.exports = router;