import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINATY_CLOUD_NAME,
    api_key: process.env.CLOUDINATY_API_KEY,
    api_secret: process.env.CLOUDINATY_API_SECRET,
});

//GET ALL POST
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts})
    } catch (error) {
        res.status(500).json({success: false, message: error});
    }
});

//CREATE A POST

//CREATE A POST

router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;
        
        console.log(name, prompt, photo);
  
      // Loop through array of files and upload each one individually
      const photoUrls = await Promise.all(photo.map(async (file) => {
        const photoUrl = await cloudinary.uploader.upload(file);
        return photoUrl.url;
      }));
  
      const newPost = await Post.create({
        name,
        prompt,
        photo: photoUrls, // Store array of photo URLs in database
      });
  
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(500).json({ success: false, message: error });
    }
  });
  

export default router;