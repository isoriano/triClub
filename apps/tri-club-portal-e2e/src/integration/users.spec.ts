import { toASCII } from 'punycode';
import { getSectionsHeadings } from '../support/app.po';

describe('tri-club-portal', () => {
  describe('User Registration', () => {
    beforeEach(() => cy.visit('user/register'));

    it('should display welcome message', () => {
      getSectionsHeadings().contains(`Join TriClub today, it's Free!`);
    });

    it('should redirect to Sign In when button clicked', () => {
      cy.get('a').click();

      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:4200/login')
      });
    });

    it('should show validation messages when submitted form with errors', () => {
      cy.get('form').submit();
      cy.get('.tsc-error').contains('Please enter correct information');
    });

    it('should not show password strength while password input is empty', () => {
      cy.get('.tcs-strength-container').should('not.exist');
    });

    it('should show password strength colored based on the password typed', () => {
      cy.get(`input[formcontrolname="password"]`).type('P');
      cy.get('.tcs-strength-container').should('exist');
      cy.get('.tcs-strength-container').find('.point').should('have.css', 'background-color', 'rgb(255, 0, 0)');

      cy.get(`input[formcontrolname="password"]`).type('Pa');
      cy.get('.tcs-strength-container').find('.point').should('have.css', 'background-color', 'rgb(255, 153, 0)');

      cy.get(`input[formcontrolname="password"]`).type('Passw0');
      cy.get('.tcs-strength-container').find('.point').should('have.css', 'background-color', 'rgb(255, 255, 0)');

      cy.get(`input[formcontrolname="password"]`).type('Passw0rd!');
      cy.get('.tcs-strength-container').find('.point').should('have.css', 'background-color', 'rgb(153, 255, 0)');

      cy.get(`input[formcontrolname="password"]`).type('Passw0rd!1234');
      cy.get('.tcs-strength-container').find('.point').last().should('have.css', 'background-color', 'rgb(0, 255, 0)');
    });

    it(`should validation for unique email when trying to register with an email already on the DB`, () => {

      cy.get(`input[formcontrolname="email"]`).type(`e2e@tcs.ie`);
      cy.get(`input[formcontrolname="password"]`).type('Passw0rd');
      cy.get(`input[formcontrolname="fullName"]`).type('E2e Sample User');
      cy.get(`input[formcontrolname="dateOfBirth"]`).type('12/08/2086');
      cy.get('form').submit();

      cy.get('.tsc-error').contains('The email address is already in use by another account');
    });

    it(`should redirect user to 'profile' when registered successfully`, () => {

      cy.get(`input[formcontrolname="email"]`).type(`${new Date().getTime()}@tcs.ie`);
      cy.get(`input[formcontrolname="password"]`).type('Passw0rd');
      cy.get(`input[formcontrolname="fullName"]`).type('E2e Sample User');
      cy.get(`input[formcontrolname="dateOfBirth"]`).type('12/08/2086');
      cy.get('form').submit();

      cy.location().should((loc) => {
        expect(loc.href).to.eq('http://localhost:4200/user/profile')
      });
    });
  });
});
