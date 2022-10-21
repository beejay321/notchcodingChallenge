import PostModel from "./schema.js";

const addToPost = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newPost = new PostModel(name, description);
    await newPost.save();

    res.status(201).send({ newProduct });
  } catch (error) {
    next(error);
  }
};

const createNewPost = async (req, res, next) => {
  try {
    const newPost = new PostModel(req.body);
    await newPost.save();
    console.log(newPost);

    res.status(201).send({ newPost });
  } catch (error) {
    next(error);
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const posts = await PostModel.find();
    res.send({ posts });
  } catch (error) {
    next(error);
  }
};

const getSinglePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.status(200).send({ post });
  } catch (error) {
    next(error);
  }
};

const editSinglePost = async (req, res, next) => {
  try {
    const editedPost = await PostModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send({ editedPost });
  } catch (error) {
    next(error);
  }
};

const deleteSinglePost = async (req, res, next) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
    res.status(204).send({ message: `${req.params.id} deleted!!` });
  } catch (error) {
    next(error);
  }
};

const postHandlers = {
  addToPost,
  createNewPost,
  getAllPost,
  getSinglePost,
  editSinglePost,
  deleteSinglePost,
};

export default postHandlers;
