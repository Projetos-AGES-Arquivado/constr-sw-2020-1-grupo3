const Keycloak = require('keycloak-connect');

const keycloakConfig = require('../keycloack.json');

const keycloak = new Keycloak({}, keycloakConfig);

keycloak.redirectToLogin = () => false;
module.exports = keycloak;