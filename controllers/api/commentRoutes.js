const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// this renders all the comments
router.get('/', async (req, res) => {
    const comment = await Comment.findAll({})
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// creating new comments
router.post('/', withAuth, async (req, res) => {
    const comment = await Comment.create({
        post_id: req.body.post_id,
        comment_text: req.body.comment_text,
        user_id: req.session.user_id,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// updating comments
router.put('/', withAuth, async (req, res) => {
    const comment = await Comment.create(
        {
            post_id: req.body.post_id,
            comment_text: req.body.comment_text,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// deleting comments
router.delete('/:id', withAuth, async (req, res) => {
    const comment = await Comment.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
