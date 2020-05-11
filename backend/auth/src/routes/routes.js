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

routes.get('/equipament',equipamentController.index);
routes.get('/equipament/:equipamentId',equipamentController.index);
routes.post('/equipament',equipamentController.store);
routes.delete('/equipament/:equipamentId',equipamentController.delete);
routes.put('/equipament/:equipamentId',equipamentController.update);
routes.patch('/equipament/:equipamentId',equipamentController.update);

//rooms

routes.get('/room',roomController.index);
routes.get('/room/:roomId',roomController.index);
routes.post('/room',roomController.store);
routes.delete('/room/:roomId',roomController.delete);
routes.put('/room/:roomId',roomController.update);
routes.patch('/room/:roomId',roomController.update);

//Swagger UI

routes.use('/api-docs', swaggerUi.serve);
routes.get('/api-docs', swaggerUi.setup(swaggerDocument))

module.exports = routes;
