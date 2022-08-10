const { Posts, Likes } = require("../models");

// create a post
const createPost = async (req, res) => {
  const { postText, postImg } = req.body;

  try {
    const post = await Posts.create({
      postText,
      postImg,
      username: req.user.username,
      UserId: req.user.id
    });
    res.status(201).json({ post });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//get all posts
const allPosts = async (req, res) => {
  try {
    const listofposts = await Posts.findAll({
      include: [Likes]
    });
    const likedPosts = await Likes.findAll();
    res.status(200).json({ listofposts, likedPosts });
  } catch (error) {
    res.status(400).json(error);
  }
};

// get a single post 
const onePost = async (req, res) => {
  const {id} = req.params

  try {
    const post = await Posts.findByPk(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error);
  }
   
}

// update post
const updatePost = async (req, res) => {
  const {postText, id, postImg} = req.body

  try {
    if(!postImg){
      const newPost = await Posts.update({postText}, {where: {id: id}}) 
      res.status(201).json({message: 'the post has been updated', newPost})
    }else{
      const newPostImg = await Posts.update({postText, postImg}, {where: {id: id}})
      res.status(201).json({message: 'the post has been updated with image', newPostImg: newPostImg})
    }
    
  } catch (error) {
    res.status(400).json({ error });
  }
}

// delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await Posts.destroy({ where: { id } });
    res.status(200).json({ id, message: "deleted post" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { createPost, allPosts, deletePost, updatePost, onePost};
