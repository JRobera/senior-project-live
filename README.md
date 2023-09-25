# Social Media and Job Board Website

A social media and job board website that allows jobseekers and employers to connect and share information. Users can post photos, videos, and articles, as well as engage in chat conversations with their followers. Employers can post job openings and view applicant details, while jobseekers can apply for job openings. The website also includes an admin panel for managing user accounts and reported posts.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- User Registration: Allow users to create accounts as jobseekers, employers, or admins.
- Social Media Features: Users can post photos, videos, and articles to share information.
- Chat Feature: Users can engage in chat conversations with their followers.
- Job Board: Employers can post job openings, and jobseekers can apply for those openings.
- Applicant Tracking: Employers can view applicant details for each job opening.
- Admin Panel: An admin dashboard to manage user accounts and reported posts.

## Technologies

- MongoDB: A NoSQL database used to store user data, posts, job openings, and other information.
- Express.js: A web application framework for building the server-side logic and APIs.
- React: A JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime environment used for server-side development.
- Socket.IO: Enables real-time chat functionality between users.
- JWT (JSON Web Tokens): Used for user authentication and authorization.
- HTML/CSS: Markup and styling for the website's user interface.
- Other libraries and tools: (list any other relevant technologies or libraries used)

## Installation

1. Clone the repository:
   https://github.com/JRobera/senior-project-live.git

2. Install dependencies for the server:
   cd /server
   npm install

3. Install dependencies for the client:
   cd /client
   npm install

4. Set up environment variables:

- Create a `.env` file in the `server` directory.
- PORT
- Add MONGO_URI
- Add ACCESS_TOKEN_SECRET
- Add REFRESH_TOKEN_SECRET
- Add NODEMAILERUSER
- Add NODEMAILERPASS

5. Start the development server:
   cd /server
   npm run start

6. Start the client:
   cd /server
   npm run start

7. Access the website at `http://localhost:3000` in your browser.

## Usage

- Register a new account as a jobseeker, employer, or admin.
- Log in using your credentials.
- Explore the social media features by posting photos, videos, and articles.
- Engage in chat conversations with your followers.
- Employers can post job openings and view applicant details in their dashboard.
- Jobseekers can browse job openings and apply for positions.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.
