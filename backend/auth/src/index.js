const express    = require('express');
const bodyParser = require('body-parser');
const {keycloak, session, memoryStore} = require('./config/keycloak');
const routes     = require('./routes/routes');
const mongoose   = require('mongoose');

mongoose.connect('mongodb+srv://user:userpass@cluster0-tthez.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(session({
    secret:'BeALongSecret',
    resave: false,
    saveUninitialized: true,
    store: memoryStore
}));
app.use(keycloak.middleware());

app.use(routes);


module.exports.start = port =>
  app.listen(port, () => console.log(`Listening on port ${port}`));
