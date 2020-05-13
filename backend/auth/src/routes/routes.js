const express    = require('express');
const {keycloak} = require('../config/keycloak');
const routes = new express.Router();

const swaggerUi  = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json')

const equipamentController = require('../controllers/EquipamentController');
const roomController = require('../controllers/RoomController');

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


//equipament

routes.get('/equipament', keycloak.protect() , equipamentController.index);
routes.get('/equipament/:equipamentId', keycloak.protect(), equipamentController.index);
routes.post('/equipament', keycloak.protect(), equipamentController.store);
routes.delete('/equipament/:equipamentId', keycloak.protect(), equipamentController.delete);
routes.put('/equipament/:equipamentId', keycloak.protect(), equipamentController.update);
routes.patch('/equipament/:equipamentId', keycloak.protect(), equipamentController.update);

//rooms

routes.get('/room', keycloak.protect() ,roomController.index);
routes.get('/room/:roomId', keycloak.protect() ,roomController.index);
routes.post('/room', keycloak.protect() ,roomController.store);
routes.delete('/room/:roomId', keycloak.protect() ,roomController.delete);
routes.put('/room/:roomId', keycloak.protect() ,roomController.update);
routes.patch('/room/:roomId', keycloak.protect() ,roomController.update);

//Swagger UI

routes.use('/api', swaggerUi.serve);
routes.get('/api', swaggerUi.setup(swaggerDocument))

module.exports = routes;
