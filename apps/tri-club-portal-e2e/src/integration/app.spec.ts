import { getSectionsHeadings } from '../support/app.po';

describe('tri-club-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('should display disclaimer message box', () => {
    cy.get('.cdk-overlay-container').find('snack-bar-container').should('exist');
  });

  it('should redirect to outside the site if disclaimer action is clicked', () => {
    cy.get('.cdk-overlay-container').find('button').click();

    cy.location().should((loc) => {
      expect(loc.host).not.to.eq('https://localhost:4200')
    });
  });

  it('should redirect to login when header button is clicked', () => {
    cy.get('mat-toolbar').find('#tcsLoginBtn').click();

    cy.location().should((loc) => {
      expect(loc.href).not.to.eq('https://localhost:4200/login')
    });
  });
});
