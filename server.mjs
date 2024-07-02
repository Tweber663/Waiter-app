import jsonServer from 'json-server';
import path from 'path';
import express from 'express';

// Create a new Express server
const server = express();

// Serve static files from the 'build' directory
server.use(express.static('build'));

// JSON Server middleware
const middlewares = jsonServer.defaults({
  noCors: true
});
server.use(middlewares);

// API Routes
const router = jsonServer.router('build/db/app.json');
server.use('/api', router);

// Serve index.html for all other routes (for React Router)
server.get('*', (req, res) => {
  res.sendFile(path.resolve('build', 'index.html'));
});

// Start the server
const port = process.env.PORT || 3130;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});