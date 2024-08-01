const express = require('express');
const multer = require('multer');
const cloudinary = require('../Utils/Cloudinary');
const Video = require('../Models/VideoSchema');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
  try {
    const { title, description } = req.body;
    const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, { folder: 'images',resource_type:'image'});
    const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, { folder: 'videos', resource_type: 'video' });
    
    const video = new Video({
      title,
      description,
      thumbnailUrl: thumbnailResult.secure_url,
      videoUrl: videoResult.secure_url,
    });

    await video.save();
    
    res.status(201).json({message:'Successfully Uploaded' ,video});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/video/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });
    res.json(video);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
