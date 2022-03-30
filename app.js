import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import logger from './middleware/logger'
import fs from 'fs';
import router from './routes';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname for es6
const __dirname = dirname(fileURLToPath(import.meta.url));

// for the use of .env.dev
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

// initialize a server
const app = new express();

// Initialize body Parser
app.use(logger);

// Body Parser
app.use(express.json());

// static folder
app.use(express.static(path.join(__dirname, 'public')));
// app.use(
//   (req, res, next) => {
//     if (req.url === '/home') {
//       fs.readFile(path.join(__dirname, 'public', 'home.html'), (err, data) => {
//         if (err) throw err;
//         res.writeHead(200, {'Content-type': 'text/html'});
//         res.end(data)
//       })
//     }
//   }
// )


// router
app.use(router);



// PORT
const PORT = process.env.PORT;

// listen to PORT
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
