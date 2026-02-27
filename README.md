# Project Name: Club Chaser

## Description:
This project is a web application that allows users to search and discover venues and events all over the United Kingdom. Users can browse through various categories of events, view detailed information about each event or venue, and purchase tickets through Skiddle. The app also requires the user to provide credentials for essential APIs, including a mapping API and Auth0 for authentication.

## Installation:
0. Use Node.js 20 LTS:
   ```
   nvm use
   ```

1. Clone the repository from GitHub:
   ```
   git clone https://github.com/your-username/uk-venues-events-webapp.git
   ```

2. Navigate to the project directory:
   ```
   cd uk-venues-events-webapp
   ```

3. Install the project dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and provide the following credentials:

   ```
   MAP_API_KEY=your_map_api_key
   AUTH0_DOMAIN=your_auth0_domain
   AUTH0_CLIENT_ID=your_auth0_client_id
   AUTH0_CLIENT_SECRET=your_auth0_client_secret
   ```

   Note: Replace `your_map_api_key`, `your_auth0_domain`, `your_auth0_client_id`, and `your_auth0_client_secret` with your actual credentials.

## Usage:
1. Run the development server:
   ```
   npm run dev
   ```

2. Open a web browser and navigate to `http://localhost:3000` to access the web application.

3. Use the search bar or browse the categories to find venues and events throughout the United Kingdom.

4. Click on a venue or event to view detailed information, including date, time, location, and ticket availability.

5. To purchase tickets, click on the "Buy Tickets" button, which will redirect you to the Skiddle ticketing platform.

## Contributing:
Contributions to this project are welcome. If you find any issues or have any suggestions for improvement, please submit them through the project's GitHub issue tracker. Before making any changes, please discuss your ideas with the project maintainers to ensure they align with the project's goals.

## License:
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of this license.

## Acknowledgments:
- [Skiddle](https://www.skiddle.com/) for providing the ticketing integration.
- [Auth0](https://auth0.com/) for authentication and user management.
- [Your Map API Provider] for the mapping API used in the project.

## Contact:
If you have any questions or inquiries related to this project, you can contact the project maintainers at [email@example.com].
