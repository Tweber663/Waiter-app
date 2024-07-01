import path from 'path';
import { fileURLToPath } from 'url';
import jsonServer from 'json-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('public/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});

const port = process.env.PORT || 3130;

server.use(middlewares);

// Rewriting API routes
server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}));

// Use the router
server.use(router);

// Serve index.html for all non-API routes
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});