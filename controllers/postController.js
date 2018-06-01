const mongoose = require('mongoose');
const User = mongoose.model('users');
const Post = mongoose.model('posts');

exports.getMyPosts = (req, res) => {
    Post.find({ user: req.user.id })
        .populate('user')
        .then(posts => {
            res.render('posts/index', {
                posts: posts
            });
        })
        .catch(error => console.log(error));
};

exports.getByUserId = (req, res) => {
    Post.find({ user: req.params.userId, status: 'public' })
        .populate('user')
        .then(posts => {
            res.render('posts/index', {
                posts: posts
            });
        })
        .catch(error => console.log(error));
};

exports.getAll = (req, res) => {
    Post.find({ status: 'public' })
        .populate('user')
        .sort({ date: 'desc' })
        .then(posts => {
            res.render('posts/index', {
                posts: posts
            });
        })
        .catch(error => {
            console.log(error);
        });
};

exports.deleteById = (req, res) => {
    Post.remove({ _id: req.params.id })
        .then(() => {
            res.redirect('/dashboard');
        })
        .catch(error => console.log(error));
};

exports.getPostById = (req, res) => {
    Post.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(post => {
            if (post.status == 'public') {
                res.render('posts/show', {
                    post: post
                });
            } else {
                if (req.user) {
                    if (req.user.id == post.user._id) {
                        res.render('posts/show', {
                            post: post
                        });
                    } else {
                        res.redirect('/posts');
                    }
                } else {
                    res.redirect('/posts');
                }
            }
        });
};

exports.editPostById = (req, res) => {
    Post.findOne({
        _id: req.params.id
    })
        .populate('user')
        .populate('comments.commentUser')
        .then(post => {
            post.title = req.body.title;
            post.body = req.body.body;
            post.status = req.body.status;
            post.allowComments = req.body.allowComments ? true : false;

            post.save()
                .then(post => {
                    res.redirect('/dashboard');
                })
                .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
};

exports.getEditPage = (req, res) => {
    Post.findOne({
        _id: req.params.id
    })
        .then(post => {
            if (post.user != req.user.id) {
                res.redirect('/posts');
            } else {
                res.render('posts/edit', {
                    post: post
                });
            }
        });
};

exports.createPost = (req, res) => {
    const newPost = {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        allowComments: req.body.AllowComments ? true : false,
        user: req.user.id
    };

    new Post(newPost)
        .save()
        .then(post => {
            res.redirect(`posts/show/${post.id}`);
        })
        .catch(error => {
            console.log(error);
        });
};

exports.getAddPage = (req, res) => {
    res.render('posts/add');
};

exports.createComment = (req, res) => {
    Post.findOne({ _id: req.params.id })
        .then(post => {
            const newComment = {
                commentBody: req.body.commentBody,
                commentUser: req.user.id
            }
            post.comments.unshift(newComment);
            post.save()
                .then(post => {
                    res.redirect(`/posts/show/${post.id}`);
                });
        });
};