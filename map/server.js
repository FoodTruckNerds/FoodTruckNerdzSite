require('dotenv').config()
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');
const rateLimit = require('express-rate-limit');

const app = express();
const port = 3000;

if (!process.env.GOOGLE_MAPS_API_KEY) {
    console.error('Please provide a GOOGLE_MAPS_API_KEY environment variable');
    process.exit(1);
}

// Configure rate limiter: max 5 requests per second
const limiter = rateLimit({
    windowMs: 1000, // 1 second
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests, please try again later.'
});

app.use(cors());
app.use(express.static(path.join(__dirname)));

// Apply rate limiter to food trucks endpoint
app.get('/api/food-trucks', limiter, async (req, res) => {
    const { lat, lng, ne_lat, ne_lng, sw_lat, sw_lng } = req.query;
    try {
        const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': process.env.GOOGLE_MAPS_API_KEY,
                'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.location,places.rating,places.currentOpeningHours'
            },
            body: JSON.stringify({
                textQuery: 'food truck',
                locationRestriction: {
                    rectangle: {
                        low: {
                            latitude: parseFloat(sw_lat),
                            longitude: parseFloat(sw_lng)
                        },
                        high: {
                            latitude: parseFloat(ne_lat),
                            longitude: parseFloat(ne_lng)
                        }
                    }
                },
                maxResultCount: 20
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Additional bounds validation to ensure results are within viewport
        const transformedData = {
            locations: (data.places || [])
                .filter(place => {
                    if (!place.location) return false;
                    
                    const lat = place.location.latitude;
                    const lng = place.location.longitude;
                    
                    return lat >= parseFloat(sw_lat) && 
                           lat <= parseFloat(ne_lat) && 
                           lng >= parseFloat(sw_lng) && 
                           lng <= parseFloat(ne_lng);
                })
                .map(place => ({
                    name: place.displayName?.text,
                    address: place.formattedAddress,
                    coordinates: {
                        latitude: place.location?.latitude,
                        longitude: place.location?.longitude
                    },
                    rating: place.rating,
                    open: place.currentOpeningHours?.openNow
                }))
        };

        res.json(transformedData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running on http://localhost:${port}`);
});
