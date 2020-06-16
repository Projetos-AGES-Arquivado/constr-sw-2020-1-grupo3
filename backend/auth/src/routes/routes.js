const express    = require('express');
const {keycloak} = require('../config/keycloak');
const routes = new express.Router();

const swaggerUi  = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const resourceController = require('../controllers/resourceController');
const resourceTypeController = require('../controllers/resourceTypeController')

routes.get('/ping', function(req, res) {
  res.status(200).send({pong: true});
});

routes.post('/login', (req, res) => {
  const {login, password} = req.body;
  console.log(req.body);
  keycloak.grantManager
    .obtainDirectly(login, password)
    .then(grant => {
      keycloak.storeGrant(grant, req, res);
      res.status(200).send(grant);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});


//resources
routes.get('/resources', keycloak.protect() ,resourceController.index);
routes.get('/resources/:resourceId', keycloak.protect() ,resourceController.index);
routes.post('/resources', keycloak.protect() ,resourceController.store);
routes.delete('/resources/:resourceId', keycloak.protect() ,resourceController.delete);
routes.put('/resources/:resourceId', keycloak.protect() ,resourceController.update);
routes.patch('/resources/:resourceId', keycloak.protect() ,resourceController.update);

//resource types
routes.get('/resources-types', keycloak.protect() , resourceTypeController.index);
routes.get('/resources-types/:resourceTypeId', keycloak.protect(), resourceTypeController.index);
routes.post('/resources-types', keycloak.protect(), resourceTypeController.store);
routes.delete('/resources-types/:resourceTypeId', keycloak.protect(), resourceTypeController.delete);
routes.put('/resources-types/:resourceTypeId', keycloak.protect(), resourceTypeController.update);
routes.patch('/resources-types/:resourceTypeId', keycloak.protect(), resourceTypeController.update);

//Swagger UI

routes.use('/api', swaggerUi.serve);
routes.get('/api', swaggerUi.setup(swaggerDocument))

module.exports = routes;
