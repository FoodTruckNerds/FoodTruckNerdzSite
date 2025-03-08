#!/bin/bash

# Memphis downtown coordinates
LAT=35.1495
LNG=-90.0490

echo "Testing food truck search for Memphis (${LAT}, ${LNG})"

# Make sure server is running before testing
if ! curl -s "http://localhost:3000" > /dev/null; then
    echo "Error: Server is not running. Please start the server first."
    exit 1
fi

# Make the API request and format the output using jq
curl -s "http://localhost:3000/api/food-trucks?lat=${LAT}&lng=${LNG}"
