import fs from 'fs';

export const writeFile = (filename, content) => {
  fs.writeFileSync(filename, JSON.stringify(content, null, 2), 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

export const readFile = (filename) => {
  return JSON.parse(fs.readFileSync(filename))
}

export const  bodyParser =  async (req) => {
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }
  return JSON.parse(Buffer.concat(buffers).toString())
}

export const notFoundRoutes = (res) => {
  res.writeHead(404, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ message: 'Route Not Found' }))
}