# map

This directory contains client + server code for barebones interactive map webpage.

## Files

- `.env`: Environment variables configuration.
- `.gitignore`: Git ignore file.
- `index.html`: HTML file for the map page.
- `package.json`: Node.js package configuration.
- `script.js`: JavaScript file for the map page.
- `server.js`: Node.js server script.
- `test-food-truck-search.sh`: Shell script for testing the food truck search functionality.

## Setup and Running

1. **Install Dependencies**:

    ```sh
    cd map
    npm install
    ```

2. **Set Up Environment Variables**:
    - Create a `.env` file in the `map` directory and add the necessary environment variables.

    ```sh
    GOOGLE_MAPS_API_KEY="get from tyler. It's super secret."
    ```

3. **Run the Server**:

    ```sh
    npm start
    ```

4. **Open the Map Page**:
    - http://localhost:3000
