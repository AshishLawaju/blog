import mongoose , {model} from "mongoose" ;

type blogTypes = {
    title: string,
    content: string,
    author: string,
    tags: [string]
};

const blogSchema = new mongoose.Schema<blogTypes>({
    title:{
        type: String,
        required: true
    },
    content: {
                type: String,
                required: true
            },
    author: {
        type: String,
        required: true
    },
    tags:{
        type: [String]
    }
},{
    timestamps : true
}
)

const Blog = model<blogTypes>("blog",blogSchema);
export { Blog } ;