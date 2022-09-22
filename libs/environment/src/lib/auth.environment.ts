export const AuthEnvironment = {
  apiUrl: 'http://localhost:1337/api/',
  auth0Settings: {
    domain: 'dev-ub-aav99.eu.auth0.com',
    clientId: 'sp5WsqXx2yP2K6yXjRL159esBMgEUeiZ',
    audience: 'https://dev-ub-aav99.eu.auth0.com/api/v2/',
    redirectUri: `${window.location.origin}/auth`
  },
};
