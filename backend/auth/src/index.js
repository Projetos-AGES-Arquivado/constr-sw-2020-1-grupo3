const express    = require('express');
const bodyParser = require('body-parser');
const keycloak   = require('./config/keycloak');
const routes     = require('./routes/routes');

const app = express();
app.use(bodyParser.json());
app.use(keycloak.middleware());
app.use(routes);


module.exports.start = port =>
  app.listen(port, () => console.log(`Listening on port ${port}`));
