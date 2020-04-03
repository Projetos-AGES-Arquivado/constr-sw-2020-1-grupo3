const express  = require('express');
const keycloak = require('../config/keycloak');

const routes = new express.Router();


keycloak.redirectToLogin = () => false;

routes.get('/ping', function(req, res) {
  res.status(200).send({pong: true});
});

routes.post('/login', (req, res) => {
  keycloak.grantManager
    .obtainDirectly(req.body.login, req.body.password)
    .then(grant => {
      res.json(grant).status(200);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

module.exports = routes;
