import fs from 'fs';
import https from 'https';
import express from 'express';
import { handler } from './build/handler.js';

const app = express();

// optional middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount SvelteKit
app.use(handler);

// SSL config
const sslOptions = {
  key: fs.readFileSync('./ssl/private.key'),
  cert: fs.readFileSync('./ssl/certificate.crt')
};

https.createServer(sslOptions, app).listen(443, () => {
  console.log(`HTTPS server running on https://localhost:443`);
});