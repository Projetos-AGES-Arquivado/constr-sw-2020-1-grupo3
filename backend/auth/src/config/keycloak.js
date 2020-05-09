const Keycloak = require('keycloak-connect');
const session = require('express-session');

const memoryStore = new session.MemoryStore();

const keycloakConfig = require('../keycloack.json');

const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);

//keycloak.redirectToLogin = () => false;
module.exports = { keycloak, session, memoryStore }