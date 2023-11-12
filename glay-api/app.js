const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Image = require('./models/Image');
const Link = require('./models/Link');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
const path = require("path");
const dotenv = require('dotenv');

dotenv.config();
const MONGODB_URI = "mongodb+srv://books:books@cluster0.iplgng7.mongodb.net/test?retryWrites=true&w=majority" || process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Use the cors middleware to allow requests from all origins.
app.use(cors(
  {
    origin:[""],
    methods:["POST","GET"],
    credentials: true
  }
));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.json());

app.get("/",(req,res)=>{
  res.json("API");
})
// POST endpoint to add an image
app.post('/api/image', async (req, res) => {
  try {
    const { pic_url, pic_title, pic_description } = req.body;

    if (!pic_url || !pic_title || !pic_description) {
      return res.status(400).json({ error: 'Please provide pic_url, pic_title, and pic_description.' });
    }

    const newImage = new Image({
      pic_url,
      pic_title,
      pic_description,
    });

    const savedImage = await newImage.save();
    res.status(201).json({ message: 'Image posted successfully.', image: savedImage });
  } catch (err) {
    console.error('Error posting image:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/api/link', async (req, res) => {
  try {
    const { link_name, content, pass_key } = req.body;

    if (!link_name || !content || !pass_key) {
      return res.status(400).json({ error: 'Please provide link_name, content, and pass_key.' });
    }

    const newLink = new Link({
      link_name,
      content,
      pass_key,
    });

    const savedLink = await newLink.save();
    
    res.status(201).json({ message: 'Link posted successfully.', link: savedLink });
  } catch (error) {
    // Check for duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Link name must be unique.' });
    }

    // Handle other errors
    console.error('Error posting link:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }

});






// GET endpoint to retrieve all images
app.get('/api/images', async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).json(images);
  } catch (err) {
    console.error('Error retrieving images:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ...

// GET endpoint to retrieve an individual image by ID
app.get('/api/images/:id', async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);

    if (!image) {
      return res.status(404).json({ error: 'Image not found.' });
    }

    res.status(200).json(image);
  } catch (err) {
    console.error('Error retrieving image by ID:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// ...

app.get('/api/link/:link_name/:pass_key', async (req, res) => {
  try {
    const { link_name , pass_key} = req.params;
    const link = await Link.findOne({ link_name: link_name });
    if(!link) return res.status(400).json("Wrong link name!");

    const validated = await bcrypt.compare(pass_key, link.pass_key);
    if(!validated) return res.status(400).json("Wrong credentials!");
    const data = link.content;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
