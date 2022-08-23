const { Comments, CommentLikes } = require("../models");

// get all comments

const getComments = async (req, res) => {
  const postId = req.params.postId;
  try {
    const comments = await Comments.findAll({
      where: { PostId: postId },
      include: [CommentLikes]
    });
    res.status(200).json({ comments });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// create comment
const createComment = async (req, res) => {
  const { commentText, commentImg, PostId } = req.body;

  try {
    const comment = await Comments.create({
      commentText,
      commentImg,
      PostId,
      username: req.user.username,
      UserId: req.user.id,
    });
    res.status(201).json({ comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const updateComment = async (req, res) => {
  const { commentText, id, commentImg } = req.body;

  try {
    if (!commentImg) {
      const newPost = await Comments.update(
        { commentText },
        { where: { id: id } }
      );
      res.status(201).json({ message: "comment updated", newPost });
    } else {
      const newPostImg = await Comments.update(
        { commentText, commentImg },
        { where: { id: id } }
      );
      res
        .status(201)
        .json({
          message: "comment updated with image",
          newPostImg: newPostImg,
        });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// delete a comment
const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comments.destroy({ where: { id: commentId } });
    res.status(200).json({ comment, message: "deleted comment" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

// like a comment
const likeComment = async (req, res) => {
  const { CommentId } = req.body;
  const UserId = req.user.id;
  const username = req.user.username;

  try {
    const commentLiked = await CommentLikes.findOne({
      where: {
        CommentId,
        UserId,
        username,
      },
    });

    if (!commentLiked) {
      await CommentLikes.create({ CommentId, UserId, username });
      res.status(200).json({ message: "liked the comment", liked: true });
    } else {
      await CommentLikes.destroy({
        where: { CommentId, UserId, username },
      });
      res.status(200).json({ message: "unliked the comment", liked: false });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// get all comment likes
const getCommentLikes = async (req, res) => {
  try {
    const likedComments = await CommentLikes.findAll({
      where: { UserId: req.user.id },
    });
    res.status(200).json({ likedComments });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = {
  getComments,
  createComment,
  deleteComment,
  updateComment,
  likeComment,
  getCommentLikes,
};
