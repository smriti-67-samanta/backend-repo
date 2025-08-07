const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');


router.post('/vehicles', async (req, res) => {
  try {
    const vehicle = new Vehicle(req.body);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/vehicles/:id/trips', async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
    
    vehicle.trips.push(req.body);
    await vehicle.save();
    
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/vehicles/long-trips', async (req, res) => {
  try {
    const vehicles = await Vehicle.find({
      'trips.distance': { $gt: 200 }
    });
    res.json(vehicles);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;