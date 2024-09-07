import mongoose from "mongoose";
import { ObjectId } from "mongodb";
const postSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        // fileId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'fs.files',
        //     required: true,
        // },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            unique: true,
        },
        // likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        // views: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    }, { timestamps: true }
)
const Post = mongoose.model('Post', postSchema);
export default Post;