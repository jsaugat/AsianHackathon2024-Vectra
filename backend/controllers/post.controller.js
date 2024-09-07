import Post from '../models/post.model.js'
import { errorHandler } from '../utils/error.js';
//? CREATE POST 
export const create = async (req, res, next) => {
    try {
        const { name, content, file, category } = req.body;
        if (!name || !content || !category) {
            return next(errorHandler(400, "All fields are required"));
        }
        const slug = name.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
        const newPost = new Post({
            ...req.body,
            slug,
            file,
        });
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);

    } catch (error) {
        next(error);
    }
};

// export const getPosts=async(req,res,next)=>{
//     try{
//         const startIndex=parseInt(req.query.startIndex||0);
//         const limit=parseInt(req.query.limit || 10);
//         const sortDirection=req.query.order==='asc'?1:-1;

//         const posts=await Post.find({
//             ...(req.query.name && {name:req.query.name}),
//             ...(req.query.postId && { postId: req.query.postId }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.category && {category:req.query.category}),

//             ...(req.query.content && {category:req.query.content}),
//             ...(req,query.search && {
//                 $or: [
//                     { name: { $regex: req.query.searchTerm, $options: 'i' } },
//                     { content: { $regex: req.query.searchTerm, $options: 'i' } },
//                 ],
//             })
//         }).sort({createdAt:sortDirection}).skip(startIndex).limit(limit);

//         const totalPosts = await Post.countDocuments();
//         const now =new Date();
//         const oneMonthAgo=new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
//         const lastMonthPosts=await Post.countDocuments({
//             createdAt:{$gte:oneMonthAgo},
//         })
//         res.status(200).json({
//             posts,
//             totalPosts,
//             lastMonthPosts
//         });

//     }catch(error){
//         next(error);
//     }
// }


//? GET POST 
export const getPosts = async (req, res) => {
    try {
        // const posts = await Post.aggregate([
        //     {
        //         $lookup: {
        //             from: 'fs.files',
        //             localField: 'file', // Match the 'file' field in the Post schema with the filename in fs.files
        //             foreignField: 'filename',
        //             as: 'file',
        //         },
        //     },
        //     {
        //         $unwind: '$file',
        //     },
        //     {
        //         $lookup: {
        //             from: 'fs.chunks',
        //             localField: 'file._id',
        //             foreignField: 'files_id',
        //             as: 'file.chunks',
        //         },
        //     },
        // ]);
        const posts = await Post.find();
        res.status(200).json(posts);
        console.log(posts)
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Error fetching posts.');
    }
}

//? GET POST AND FILE
// export const getPostAndFile = async (query) => {
//     try {
//         // Step 2: Query for the Post based on the provided query
//         const post = await Post.findOne(query);

//         if (!post) {
//             throw new Error('Post not found');
//         }

//         // Step 3: Extract the filename from the Post
//         const { file: filename } = post;

//         // Step 4: Query the glbfiles.files collection to find the file with the matching filename
//         // Assuming you have a model for the glbfiles.files collection
//         // Replace 'FileModel' with the actual model name if different
//         const file = await FileModel.findOne({ filename });

//         if (!file) {
//             throw new Error('File not found');
//         }

//         // Step 5: Return the Post along with the file information
//         return { post, file };
//     } catch (error) {
//         throw error;
//     }
// };

