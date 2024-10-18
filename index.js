const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Load configuration from JSON file
const configPath = path.join(__dirname, 'config.json');
let config;

fs.readFile(configPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading config file:', err);
        process.exit(1);
    }
    config = JSON.parse(data);
});

// Redirect based on key
app.get('/:key', (req, res) => {
    console.log('Redirecting:', req.params.key);
    const key = req.params.key;
    const url = config[key];

    if (url) {
        res.redirect(url);
    } else {
        res.status(404).send('Key not found');
    }
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}/`);
});