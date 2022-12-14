import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await post.save();

    const allPosts = await Post.find();
    return res.status(201).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: "Post didn't got created" });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find();
    return res.status(201).json(allPosts);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Can't fetch all posts. Something went wrong !!!!" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userid } = req.params;

    const allPosts = await Post.find({ userId: userid });
    return res.status(201).json(allPosts);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Can't fetch users posts. Something went wrong !!!!" });
  }
};

export const likePosts = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(404).json({ message: "Can't like the post" });
  }
};
