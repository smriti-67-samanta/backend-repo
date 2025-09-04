const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;


app.use(express.json());


function readDishes() {
  try {
    const data = fs.readFileSync('db.json', 'utf8');
    return JSON.parse(data).dishes;
  } catch (error) {
    return [];
  }
}


function writeDishes(dishes) {
  try {
    const data = JSON.stringify({ dishes }, null, 2);
    fs.writeFileSync('db.json', data);
  } catch (error) {
    console.error('Error writing to file:', error);
  }
}

app.get('/dishes', (req, res) => {
  try {
    const dishes = readDishes();
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.get('/dishes/:id', (req, res) => {
  try {
    const dishes = readDishes();
    const dish = dishes.find(d => d.id === parseInt(req.params.id));
    
    if (!dish) {
      return res.status(404).json({ error: 'Dish not found' });
    }
    
    res.json(dish);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.post('/dishes', (req, res) => {
  try {
    const dishes = readDishes();
    const newDish = {
      id: dishes.length + 1,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    
    dishes.push(newDish);
    writeDishes(dishes);
    
    res.status(201).json(newDish);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


app.use((req, res) => {
  res.status(404).json({ error: "404 Not Found" });
});


app.listen(PORT, () => {
  console.log(`🍽️  Dishes API running on http://localhost:${PORT}`);
  console.log('📋 Available routes:');
  console.log('   GET    /dishes        - Get all dishes');
  console.log('   GET    /dishes/:id    - Get dish by ID');
  console.log('   POST   /dishes        - Add new dish');
  console.log('   *                     - 404 for other routes');
});