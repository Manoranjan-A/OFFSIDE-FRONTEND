const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 4000;

// Middleware to parse JSON request body
app.use(express.json());

// Serve static files from the 'mainpage' folder
app.use(express.static(path.join(__dirname, 'mainpage')));

// Serve booking.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'mainpage', 'booking.html'));
});

// POST endpoint to handle booking data
app.post('/booking', (req, res) => {
    const bookingData = req.body;  // Get the data from the client

    // Read the current bookings from the JSON file (if it exists)
    let bookings = [];
    const filePath = path.join(__dirname, 'booking.json');  // Correct file path to booking.json

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        bookings = JSON.parse(data);  // Parse existing bookings
    }

    // Add the new booking to the array
    bookings.push(bookingData);

    // Write the updated bookings array back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(bookings, null, 2));  // Save the updated array to booking.json

    res.status(200).send({ message: "Booking saved successfully" });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
