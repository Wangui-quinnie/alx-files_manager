Back-end
JavaScript
ES6
NoSQL
MongoDB
Redis
NodeJS
ExpressJS
Kue

This project is a summary of this back-end trimester: authentication, NodeJS, MongoDB, Redis, pagination and background processing.

The objective is to build a simple platform to upload and view files:

User authentication via a token
List all files
Upload a new file
Change permission of a file
View a file
Generate thumbnails for images
You will be guided step by step for building it, but you have some freedoms of implementation, split in more files etc… (utils folder will be your friend)

Of course, this kind of service already exists in the real life - it’s a learning purpose to assemble each piece and build a full product.

Learning objectives:

Creating an API with Express, authenticating users, storing data in MongoDB, storing temporary data in Redis, and setting up and using a background worker are common tasks in web development. Here's a high-level overview of how you can accomplish each of these tasks:

Creating an API with Express:

Install Express in your Node.js project using npm or yarn:
npm install express
or
yarn add express
Create an Express application and define routes to handle HTTP requests. You can define routes for different endpoints such as GET, POST, PUT, DELETE, etc.

Implement middleware functions for parsing request bodies, handling CORS, authentication, error handling, etc.

Authenticating a User:

Implement user authentication using techniques like JSON Web Tokens (JWT), OAuth, or session-based authentication.
Create routes for user registration, login, logout, and password reset.
Use middleware to protect routes that require authentication.
Storing Data in MongoDB:

Install the MongoDB Node.js driver in your project:
npm install mongodb
or
yarn add mongodb
Connect to your MongoDB database using the MongoDB URI.

Define schemas for your MongoDB collections using Mongoose or native MongoDB driver.

Perform CRUD (Create, Read, Update, Delete) operations on your MongoDB collections.

Storing Temporary Data in Redis:

Install the Redis client for Node.js in your project
npm install redis
or
yarn add redis
Connect to your Redis server.

Use Redis commands to set, get, update, and delete temporary data.

Set expiration times for temporary data using Redis's built-in TTL (Time To Live) feature.

Setting Up and Using a Background Worker:

Install a background job processing library such as Bull.js, Agenda, or Node-resque
npm install bull
or
yarn add bull
Define background jobs/tasks that need to be processed asynchronously.

Set up a worker process to consume and process background jobs/tasks.

Queue background jobs/tasks from your Express routes or other parts of your application.

Remember to handle errors gracefully, implement security best practices, and test your code thoroughly before deploying to production. Additionally, consider using environment variables to store sensitive information like API keys, database URIs, etc.








