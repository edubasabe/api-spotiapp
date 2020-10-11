const express = require('express');
const app = express();
const request = require('request');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/token', (req, res) => {
  const SPOTIFY_API_TOKEN_URL = 'https://accounts.spotify.com/api/token';
  const CLIENT_ID = process.env.CLIENT_ID; 
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const authConfig = {
    url: SPOTIFY_API_TOKEN_URL,
    headers: {
      Authorization: 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  request.post(authConfig, (err, httpResponse, body) => {
    if (err) {
      return rescl.status(400).json({
        mensaje: 'No se pudo obtener el token',
        err
      });
    }
    
    res.json(body);
  });
});

app.listen(port, (err) => {
  if (err) throw new Error(err);
  console.log(`Servidor corriendo en puerto ${ port }`);
});

