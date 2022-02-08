import * as http from 'http';
import routes from './routes/index.js';
import { notFoundRoutes } from './utils.js';

const PORT = 8005
const server = http.createServer((req, res) => {
  const { url, method } = req
  const api = routes.find(v => url.includes(v.url) && v.method === method)

  if (api) return api.controller(req, res)
  return notFoundRoutes(res)
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))