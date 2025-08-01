const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');


const adapter = new FileSync('db.json');
const db = low(adapter);


const app = express();
const PORT = 3000;


app.use(bodyParser.json());


db.defaults({ dishes: [] }).write();


const getNextId = () => {
  const dishes = db.get('dishes').value();
  return dishes.length > 0 ? Math.max(...dishes.map(d => d.id)) + 1 : 1;
};


app.post('/dishes', (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newDish = {
      id: getNextId(),
      name,
      price,
      category
    };

    db.get('dishes').push(newDish).write();
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/dishes', (req, res) => {
  try {
    const dishes = db.get('dishes').value();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/dishes/:id', (req, res) => {
  try {
    const dish = db.get('dishes').find({ id: parseInt(req.params.id) }).value();
    
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/dishes/:id', (req, res) => {
  try {
    const { name, price, category } = req.body;
    
    if (!name || !price || !category) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const updatedDish = db.get('dishes')
      .find({ id: parseInt(req.params.id) })
      .assign({ name, price, category })
      .write();

    if (!updatedDish) {
      return res.status(404).json({ error: 'Dish not found' });
    }

    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/dishes/:id', (req, res) => {
  try {
    const dish = db.get('dishes').remove({ id: parseInt(req.params.id) }).write();
    
    if (!dish.length) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    
    res.json({ message: 'Dish deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/dishes/get', (req, res) => {
  try {
    const searchTerm = req.query.name?.toLowerCase();
    
    if (!searchTerm) {
      return res.status(400).json({ error: 'Name parameter is required' });
    }

    const dishes = db.get('dishes')
      .filter(dish => dish.name.toLowerCase().includes(searchTerm))
      .value();

    if (dishes.length === 0) {
      return res.status(404).json({ message: 'No dishes found' });
    }

    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: '404 Not Found' });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});