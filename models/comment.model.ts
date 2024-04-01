
import mongoose, {model} from "mongoose";

type commentTypes = {
    user: string,
    blog: string,
    comment: string
}

const commentSchema = new mongoose.Schema<commentTypes>({
    user:{
        type: String,
        required: true
    },
    blog:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

const Comment = model<commentTypes>("comment",commentSchema);
export{ Comment };
