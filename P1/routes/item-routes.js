const express = require('express');
const { asyncHandler, APIError } = require("../middleware/errorhanlder");

const router = express.Router(); // ✅ use Router, not express()

// Random demo items
const items = [
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Phone", price: 25000 },
    { id: 3, name: "Keyboard", price: 1500 },
    { id: 4, name: "Mouse", price: 800 },
];

// GET all items
router.get("/items", asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        count: items.length,
        data: items
    });
}));

router.post('/items', asyncHandler(async (req, res) => {
    // Check if 'name' field is missing in the request body
    if (!req.body.name) {
        throw new APIError(`Item name is required — please fill the field.`);
    }

    // Create a new item object
    const newItem = {
        id: items.length + 1,  // auto-increment ID
        name: req.body.name
    };

    // Add the new item to the list
    items.push(newItem);

    // Send success response
    res.status(201).json({
        success: true,
        message: "Item added successfully!",
        data: newItem
    });
}));

module.exports = router;
