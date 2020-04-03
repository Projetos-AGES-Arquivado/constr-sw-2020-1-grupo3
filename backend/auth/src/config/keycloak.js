const Keycloak = require('keycloak-connect');

const keycloakConfig=  {
  realm: 'dev',
  'auth-server-url': "http://localhost:8080/auth/",
  'ssl-required': 'external',
  'bearer-only': true,
  resource: 'my-app',
  credentials: {
    "secret": "3b2ebd31-0baa-4927-92e6-458e6678e245"
  },
  'confidential-port': 0
};

const keycloak = new Keycloak({}, keycloakConfig);


module.exports = keycloak;