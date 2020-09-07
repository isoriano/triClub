// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
// eslint-disable-next-line @typescript-eslint/no-namespace

declare namespace Cypress {
  interface Chainable<Subject> {
    defaultLogin(): void;
    login(email: string, password: string): void;
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('defaultLogin', () => {
  cy.visit('/login');

  cy.get(`input[formcontrolname="email"]`).type('e2e@tcs.ie');
  cy.get(`input[formcontrolname="password"]`).type('Passw0rd');

  cy.get('form').submit();
});

Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');

  cy.get(`input[formcontrolname="email"]`).type(email);
  cy.get(`input[formcontrolname="password"]`).type(password);

  cy.get('form').submit();
});
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
