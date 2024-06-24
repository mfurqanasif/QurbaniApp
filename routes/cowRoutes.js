const express = require('express');
const router = express.Router();
const cowController = require('../controllers/cowController');
const verifyToken = require('../middlewares/auth');

// Get all cows
router.get('/cows', verifyToken, cowController.getAllCows);

// Get a single cow by ID
router.get('/cows/:id', verifyToken, cowController.getCowById);


// Get  cows by category
router.get('/cows/category/:category', verifyToken, cowController.getCowByCategory);

// Get  cows by category
router.get('/cowscategories', verifyToken, cowController.getCowCategories);

// Create a new cow
router.post('/cows', verifyToken, cowController.createCow);

// Update a cow by ID
router.put('/cows/:id', verifyToken, cowController.updateCow);

// Delete a cow by ID
router.delete('/cows/:id', verifyToken, cowController.deleteCow);

module.exports = router;
