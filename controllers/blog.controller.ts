import { Request,Response, NextFunction } from "express";
import { Blog } from "../models/blog.model";

const blogCreate = async(req:Request, res:Response, next:NextFunction)=>{
    const { title, content, author, tags } = req.body;
    Blog
    .create(req.body)
    .then((blogcreated)=>{
        if(!blogcreated){
            return res.status(403).json({
                message: "Cannot create blog"
            });
        }
        return res.status(200).json({
            message: "Blog created successfully!",
           
        })
    })
    .catch(error =>{
        console.log("Error creating blog: ",error);
        return res.sendStatus(500).json({message:"An error occured while creating blog"});
    })
   
}

const blogUpdate = async (req: Request, res: Response, next: NextFunction) => {
    const { title, content, author, tags } = req.body;
    const blogID = req.params.id;
    
    try {
        const updateResult = await Blog.updateOne({ _id: blogID }, { title, content, author, tags });

        if (updateResult.modifiedCount > 0) {
            return res.status(200).json({ message: "Blog updated successfully", updateResult });
        } else if (updateResult.modifiedCount === 0) {
            return res.status(404).json({ message: "Blog not found"});
        } else {
            return res.status(403).json({ message: "Cannot update blog" });
        }
    } catch (error) {
        console.error("Error updating blog:", error);
        return res.status(500).json({ message: "An error occurred while updating blog" });
    }
}   

const blogDelete = async (req:Request,res:Response,next:NextFunction)=>{
    const blogID = req.params.id;
    try{
       const blogDeleted = await Blog.deleteOne({_id:blogID});
        if(blogDeleted.deletedCount>0)
        {
            return res.status(200).json({message: "Blog deleted!"})
        }
        else if(blogDeleted.deletedCount === 0){
            return res.status(404).json({message: "Blog not found!"})
        }
        else{
            return res.status(403).json({message: "Blog cannot be deleted!"})
        }
    }
    catch(error){
        console.log("Error: ",error);
        return res.status(500).json({message: "An error occured while deleting blog"})
    }
}


export {blogCreate};
export {blogUpdate};
export {blogDelete};