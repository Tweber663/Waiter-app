import path from 'path';
import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');
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
  res.sendFile(path.resolve('build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});