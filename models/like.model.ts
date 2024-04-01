import mongoose, { model } from "mongoose";

type likeTypes = {
    user:string,
    blog: string
}
const likeSchema = new mongoose.Schema<likeTypes>({
    user:{
        type: String,
        required: true
    },
    blog:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Like = model<likeTypes>("like",likeSchema);
export {Like};


