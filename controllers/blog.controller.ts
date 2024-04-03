import { Request, Response, NextFunction } from "express";
import { Blog } from "../models/blog.model";
import { userModel } from "../models/user.model";

const blogCreate = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { title, content, tags } = req.body;
    //confilt
    if (!title || !content || !tags) {
      return res.status(400).json({
        success: false,
        message: "title, content, author, tags   are required",
      });
    }

    Blog.create({ title, content, tags, author: req.user.id })
      .then((blogcreated) => {
        if (!blogcreated) {
          return res.status(403).json({
            message: "Cannot create blog",
          });
        }
        return res.status(200).json({
          message: "Blog created successfully!",
        });
      })
      .catch((error) => {
        console.log("Error creating blog: ", error);
        return res
          .sendStatus(500)
          .json({ message: "An error occured while creating blog" });
      });
  } catch (error) {
    next(error);
  }
};

const blogUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, author, tags } = req.body;
    const blogID = req.params.id;

    const updateResult = await Blog.updateOne(
      { _id: blogID },
      { title, content, author, tags }
    );

    if (updateResult.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Blog updated successfully", updateResult });
    } else if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    } else {
      return res.status(403).json({ message: "Cannot update blog" });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while updating blog" });
  }
};

const blogDelete = async (req: Request, res: Response, next: NextFunction) => {
  const blogID = req.params.id;
  try {
    const blogDeleted = await Blog.deleteOne({ _id: blogID });
    if (blogDeleted.deletedCount > 0) {
      return res.status(200).json({ message: "Blog deleted!" });
    } else if (blogDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found!" });
    } else {
      return res.status(403).json({ message: "Blog cannot be deleted!" });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(500)
      .json({ message: "An error occured while deleting blog" });
  }
};

const blogAll = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, author, tags } = req.body;
  try {
    const getAllBlog = await Blog.find({});
    if (getAllBlog.length > 0) {
      return res.status(200).json(getAllBlog);
    } else {
      return res.status(404).json({ message: "No blogs to show" });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(403).json("Error");
  }
};

const usersBlog = async (req: Request, res: Response, next: NextFunction) => {
  const { title, content, author, tags } = req.body;
  const userID = req.params.id;
  try {
    const userBlogs = await Blog.find({ author: userID });
    if (userBlogs.length > 0) {
      return res.status(200).json(userBlogs);
    } else {
      return res.status(404).json({ message: "No blogs created by the user" });
    }
  } catch (error) {
    console.log("Error: ", error);
    return res.status(403).json({ message: "Error occured" });
  }
};

//like

const likeBlog = async (req: any, res: Response, next: NextFunction) => {
  try {
    const checkIfBlogExist = await Blog.findById({ _id: req.params.blogId });

    if (!checkIfBlogExist) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found !" });
    }

    // console.log(checkIfBlogExist.author);

    const checkPreLike = await Blog.findOne({
      _id: req.params.blogId,
      like: req.user.id,
    });

    if (checkPreLike) {
      return res.json({ success: false, message: "like already exists" });
    }

    const updateLink = await Blog.findByIdAndUpdate(
      { _id: req.params.blogId },
      {
        $push: {
          like: req.user.id,
        },
      }
    );

    if (!updateLink) {
      return res
        .status(400)
        .json({ success: false, message: "failed to add like" });
    }
    return res.status(200).json({ success: true, message: "like added" });
  } catch (error) {
    next(error);
  }
};
const removeLikeBlog = async (req: any, res: Response, next: NextFunction) => {
  try {
    const checkIfBlogExist = await Blog.findById({ _id: req.params.blogId });

    if (!checkIfBlogExist) {
      return res
        .status(400)
        .json({ success: false, message: "Blog not found !" });
    }

    // console.log(checkIfBlogExist.author);

    const checkPreLike = await Blog.findOne({
      _id: req.params.blogId,
      like: req.user.id,
    });

    if (!checkPreLike) {
      return res.json({ success: false, message: "like doesnot exists" });
    }

    const updateLike = await Blog.findByIdAndUpdate(
      { _id: req.params.blogId },
      {
        $pull: {
          like: req.user.id,
        },
      }
    );

    if (!updateLike) {
      return res
        .status(400)
        .json({ success: false, message: "failed to remove like" });
    }
    return res.status(200).json({ success: true, message: "like removed" });
  } catch (error) {
    next(error);
  }
};

export { blogCreate, likeBlog };
export { blogUpdate, removeLikeBlog };
export { blogDelete, usersBlog, blogAll };

//fix all
