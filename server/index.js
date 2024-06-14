const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Color = require('./models/colors.js');

const app = express();
const port = 3001;

const mongoURI = 'mongodb+srv://krossler:krossler123@react-fullstack.tvrikmx.mongodb.net/?retryWrites=true&w=majority&appName=react-fullstack';

mongoose.connect(mongoURI, {
  dbName: 'colorlistapp'
})
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

// MIDDLEWARES

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');


// ROUTES

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/api', async (req, res) => {
    try {
      const colors = await Color.find();
      res.render('api', { colors });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });
  


// GET MODULES

app.get('/api', async (req, res) => {
  try {
      const colors = await Color.find();
      res.json(colors);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

app.get('/api/:name', async (req, res) => {
  try {
    const color = await Color.findOne({name: req.params.name});
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(color);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST MODULES

app.post('/api', async (req, res) => {
  const { name, hex } = req.body;

  try {
    const color = new Color({ name, hex });
    const newColor = await color.save();
    res.status(201).json(newColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT MODULES

app.put('/api/:id', async (req, res) => {
  const { name, hex } = req.body;
  try {
    const updatedColor = await Color.findByIdAndUpdate(req.params.id, { name, hex }, { new: true });
    if (!updatedColor) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json(updatedColor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE MODULES

app.delete('/api/:id', async (req, res) => {
  try {
    const color = await Color.findByIdAndDelete(req.params.id);
    if (!color) {
      return res.status(404).json({ message: 'Color not found' });
    }
    res.json({ message: 'Color deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// START SERVER

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})