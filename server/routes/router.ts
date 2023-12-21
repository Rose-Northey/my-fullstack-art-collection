import express from 'express';
import * as db from '../db/db';
import multer from 'multer';
import * as Art from '../../models/art'

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// GET ALL ARTWORKS AND DETAILS FOR DISPLAY
// /api/v1/artworks
router.get('/', async (req, res) => {
  try {
    const artworks = await db.getArtOverview();
    res.json(artworks);
  } catch (error) {
    console.error('Error in GET /api/v1/artworks:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// GET ONE ARTWORK USING AN ID
// /api/v1/artworks/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    res.status(404).json({ error: 'id must be a number' });
    return;
  }
  try {
    const artInfo = await db.getArtById(id);
    if (!artInfo) {
      res.status(404).json({ error: 'id could not be found' });
      return;
    }
    res.json(artInfo);
  } catch (error) {
    console.error('Error in GET /api/v1/artworks/:id:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// ADD NEW ARTWORK
// /api/v1/artworks
router.post('/', async (req, res) => {
  try {
    const newArt = await db.addArt(req.body);
    res.status(200).json(newArt);
  } catch (error) {
    console.error('Error in POST /api/v1/artworks:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// upload new image
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const inputObject = {
      name: req.body.name,
      description: req.body.description,
      medium: req.body.medium,
      imageUrl: `/${req.file.filename}`,
      owner: req.body.owner,
      alt: req.body.alt
    };

    const newArtID = await db.addArt(inputObject);
    res.status(200).json({ newArtID });
  } catch (error) {
    console.error('Error in POST /api/v1/artworks/upload:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// edit image description
router.patch('/:id/edit', async(req,res)=>{
  const id = req.params.id
  const newArtInfo = req.body
  await db.editArtDescription(newArtInfo,id)
  res.json({})
})

// Delete artwork based on id
router.delete('/:id/delete', async(req,res)=>{
  const id = req.params.id
  await db.deleteArtById(id)
  res.json({})
})



export default router;