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

OR

    - Run Live Server in VSCode. This will start a separate server. Access the page in the `\map` subdirectory:
    
      ```
      http://127.0.0.1:5501/map/
      # 5501 or whatever port yours runs on
      ```