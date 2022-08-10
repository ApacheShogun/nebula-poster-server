const { Likes } = require("../models");

const likePost = async (req, res) => {
    const { PostId } = req.body;
    const UserId = req.user.id;
    const username = req.user.username
  try {
    //toggling the likes
    const postLiked = await Likes.findOne({
      where: {
        PostId: PostId,
        UserId: UserId,
        username: username
      },
    });

    if (!postLiked) {
      await Likes.create({ PostId: PostId, UserId: UserId, username: username});
      res.json({ message: "liked the post", liked: true });
    } else {
      await Likes.destroy({
        where: { PostId: PostId, UserId: UserId, username: username },
      });
      res.json({ message: "unliked the post", liked: false });
    }
  } catch (error) {
    res.json({ error: error });
  }
};

const getUserlikes = async (req, res) => {
  try {
    const likedPosts = await Likes.findAll({ where: {UserId: req.user.id}});
    res.status(200).json({likedPosts})
  } catch (error) {
    res.status(400).json({error})
  }

}

module.exports = { likePost, getUserlikes};
