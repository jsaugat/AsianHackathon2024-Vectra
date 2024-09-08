import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import authRoute from './routers/auth.router.js';
import userRoute from './routers/user.router.js';
import postRoute from './routers/post.route.js';
import multer from 'multer';
import { GridFSBucket } from 'mongodb';
import { Readable } from 'stream';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Enable CORS for all origins
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose.connect('mongodb+srv://test:test@cluster0.p6muf.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
});

const conn = mongoose.connection;
let bucket;

conn.once('open', () => {
  bucket = new GridFSBucket(conn.db, { bucketName: 'glbfiles' });
  console.log('GridFSBucket connected');
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/file/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const readableStream = new Readable();
  readableStream._read = () => { };
  readableStream.push(req.file.buffer);
  readableStream.push(null);

  const uploadStream = bucket.openUploadStream(req.file.originalname);
  readableStream.pipe(uploadStream)
    .on('error', (err) => {
      console.error('Error uploading file:', err);
      res.status(500).send('Error uploading file.');
    })
    .on('finish', () => {
      res.status(200).send('File uploaded successfully.');
    });
});

// app.post('/upload', upload.single('file'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send('No file uploaded.');
//   }

//   const { name, content, category, slug } = req.body;

//   const readableStream = new Readable();
//   readableStream._read = () => { };
//   readableStream.push(req.file.buffer);
//   readableStream.push(null);

//   const uploadStream = bucket.openUploadStream(req.file.originalname);

//   uploadStream.on('error', (err) => {
//     console.error('Error uploading file:', err);
//     res.status(500).send('Error uploading file.');
//   });

//   uploadStream.on('finish', async (file) => {
//     try {
//       const post = new Post({
//         name,
//         content,
//         category,
//         slug,
//         file: file.name,
//       });
//       await post.save();
//       res.status(200).send('File and post uploaded successfully.');
//     } catch (err) {
//       console.error('Error saving post:', err);
//       res.status(500).send('Error saving post.');
//     }
//   });

//   readableStream.pipe(uploadStream);
// });


app.get('/file/:filename', (req, res) => {
  const filename = req.params.filename;
  const downloadStream = bucket.openDownloadStreamByName(filename);

  downloadStream.on('error', (err) => {
    console.error('Error downloading file:', err);
    res.status(404).send('File not found.');
  });

  downloadStream.pipe(res);
});

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
