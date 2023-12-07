# Nuxt 3 URL Shortener API PROJECT

## Overview:

This open-source project is a simple URL shortener API built with Nuxt 3 and MongoDB. It allows users to shorten long URLs into more manageable and shareable links. This README provides information on how to set up and use the project.

## Project Structure:

The project follows a modular structure to enhance maintainability and organization. Here's an overview of the key directories in `server` directory:

- **/api:** Contains API-related endpoints.
- **/config:** Houses configuration files for the project, including settings for the URL shortener API.
- **/controllers:** Manages controllers, handling the business logic and interaction with the data.
- **/models:** Defines the data models for MongoDB, specifying the structure of the stored data.
- **/plugins:** Stores any plugins utilized in the project, enhancing functionality or providing additional features.
- **/repositories:** Contains repository classes responsible for interacting with the database.
- **/view-models:** Manages view models, which shape the data to be presented in the frontend.
- **tsconfig.json:** TypeScript configuration settings.

Feel free to explore each directory for more details on their specific roles and contents.

## Requirements:

- Node.js
- Nuxt 3
- MongoDB

## Installation:

1. Clone the repository:

   ```bash
   git clone https://github.com/ahrasel/nuxt-url-shortner.git
   ```

2. Navigate to the project directory:

   ```bash
   cd nuxt-url-shortner
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Configure the MongoDB connection:

   - Open `config.js` file and update the MongoDB connection URI.

5. Create `.env` file from `.env.example`

## Usage:

1. Start the Nuxt 3 app:

   ```bash
   npm run dev
   ```

2. Access the application in your browser:

   ```bash
   http://localhost:3000
   ```

3. Use the API to register URLs:

   - Send a POST request to `http://localhost:3000/api/v1/auth/register` with a JSON payload containing the original URL:

     ```json
     {
       "username": "ahrasel",
       "password": "123456789",
       "name": "MD Amanullah Hoque",
       "email": "ahrasel95@gmail.com"
     }
     ```

4. Use the API to login URLs:

   - Send a POST request to `http://localhost:3000/api/v1/auth/login` with a JSON payload containing the original URL:

     ```json
     {
       "username": "ahrasel",
       "password": "123456789"
     }
     ```

5. Use the API to logout URLs:

   - Send a POST request to `http://localhost:3000/api/v1/auth/logout` with a bearer token

6. Use the API to change password URLs:

   - Send a POST request to `http://localhost:3000/api/v1/auth/change-password` with a JSON payload containing the original URL:

     ```json
     {
       "oldPassword": "123456789",
       "newPassword": "123456789"
     }
     ```

7. Use the API to forgot password URLs:

   - Send a POST request to `http://localhost:3000/api/v1/auth/forgot-password` with a JSON payload containing the original URL:

     ```json
     {
       "email": "ahrasel95@gmail.com"
     }
     ```

8. Use the API to all shorten urls URLs:

   - Send a GET request to `http://localhost:3000/api/v1/urls`

9. Use the API to create short url URLs:

   - Send a POST request to `http://localhost:3000/api/v1/urls` with a JSON payload containing the original URL:

     ```json
     {
       "url": "http://localhost:3000/url"
     }
     ```

10. Use the API to increase click URLs:

    - Send a GET request to `http://localhost:3000/api/v1/urls/[id]/click`

    there are also some other routes for api. you can test with this vscode thunder client extension

## Configuration:

- `config.js` contains configuration settings, including the MongoDB connection URI.

## Contributing:

Contributions are welcome! If you'd like to contribute, please follow the [Contribution Guidelines](CONTRIBUTING.md).

## License:

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify it as per your needs.

## Acknowledgments:

Special thanks to the Nuxt 3 and MongoDB communities for their excellent tools and resources.

## Contact:

For any questions or concerns, feel free to reach out to the project maintainer:

- MD Amanullah Hoque
- ahrasel95@gmail.com
- Website: [GitHub Profile](https://ahrasel.com)
