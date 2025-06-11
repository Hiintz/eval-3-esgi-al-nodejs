const express = require('express');
const postsController = require("./../controller/posts.controller.js");
const auth = require("./../middleware/auth.middleware.js");

const router = express.Router();

router.get('/', auth, postsController.getAllPosts);
router.get('/:id', auth, postsController.getPostById);
router.post('/', auth, postsController.createPost);
router.put('/:id', auth, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePost);

// partie emotions
router.post('/:id/emotions', auth, postsController.addEmotion);
router.delete('/:id/emotions', auth, postsController.removeEmotion);

module.exports = router;