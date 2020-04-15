const express = require('express');
var bodyParser = require('body-parser');
var Keycloak = require('keycloak-connect');

const kcConfig = require('./keycloak.json')

const keycloak = new Keycloak({}, kcConfig);
keycloak.redirectToLogin = () => false;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(keycloak.middleware());

app.get('/ping', function(req, res) {
  res.send('pong');
});

app.post('/login', (req, res) => {
  keycloak.grantManager
    .obtainDirectly(req.body.login, req.body.password)
    .then(grant => {
      res.json(grant).status(200);
    })
    .catch(error => {
      res.send(error).status(401);
    });
});

app.use( keycloak.middleware( { logout: '/'} ));

module.exports.start = port =>
  app.listen(port, () => console.log(`Listening on port ${port}`));