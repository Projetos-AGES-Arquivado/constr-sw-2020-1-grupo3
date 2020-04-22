const express  = require('express');
const keycloak = require('../config/keycloak');

const routes = new express.Router();

routes.get('/ping', function(req, res) {
  res.status(200).send({pong: true});
});

routes.post('/login', (req, res) => {
  const {login, password} = req.body;
  keycloak.grantManager
    .obtainDirectly(login, password)
    .then(grant => {
      res.status(200).send(grant);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = routes;
