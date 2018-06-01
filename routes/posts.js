const express = require('express');
const router = express.Router();

const { getMyPosts, getByUserId, getAll, deleteById, getPostById, editPostById, getEditPage, createPost, getAddPage, createComment } = require('../controllers/postController');

const { checkAuthenticated, checkGuest } = require('../helpers/auth');

// get by user 
router.get('/user/:userId', getByUserId);

// logged in user's posts
router.get('/my', checkAuthenticated, getMyPosts);

// index
router.get('/', getAll);

// delete
router.delete('/:id', deleteById);

router.get('/show/:id', getPostById);

// edit post
router.put('/:id', editPostById);

// get edit form
router.get('/edit/:id', checkAuthenticated, getEditPage);

// post
router.post('/', createPost);

// add form
router.get('/add', checkAuthenticated, getAddPage);

// add comment
router.post('/comment/:id', createComment);

module.exports = router;