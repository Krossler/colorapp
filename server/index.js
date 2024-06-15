const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const Color = require('./models/colors.js');

// DATABASE

const mongoURI = 'mongodb+srv://krossler:password@react-fullstack.tvrikmx.mongodb.net/?retryWrites=true&w=majority&appName=react-fullstack';

mongoose.connect(mongoURI, {
  dbName: 'colorlistapp'
})
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });

// SERVER CONST

const app = express();
const port = 3001;

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

  app.get('/apicolors', async (req, res) => {
    try {
      const colors = await Color.find();
      res.render('api', { colors });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  });

  app.get('/about', (req, res) => {
    res.render('about');
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
    const hexRegex = /^#[0-9a-fA-F]{6}$/;
    if (!hexRegex.test(hex)) {
      return res.status(400).json({ message: 'Código HEX inválido' });
    }

    const existingColor = await Color.findOne({ $or: [{ name }, { hex }] });
    if (existingColor) {
      return res.status(400).json({ message: 'Essa cor já está registrada' });
    }

    const color = new Color({ name, hex });
    const newColor = await color.save();
    res.status(201).json(newColor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT MODULES

app.put('/api/:name', async (req, res) => {
  const { name } = req.params;
  const { hex } = req.body;

  try {
    const color = await Color.findOne({ name });
    if (!color) {
      return res.status(404).json({ message: 'Cor não encontrada' });
    }

    color.hex = hex;
    const updatedColor = await color.save();

    res.json(updatedColor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE MODULES

app.delete('/api/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const color = await Color.findOne({ name });
    if (!color) {
      return res.status(404).json({ message: 'Cor não encontrada' });
    }
    await Color.deleteOne({ name });
    res.status(200).json({ message: 'Cor excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// START SERVER

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})
