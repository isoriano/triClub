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
      expect(loc.href).to.eq('http://localhost:4200/login')
    });
  });

  it('should hide the login button when user is authenticated', () => {
    cy.defaultLogin();

    cy.get('mat-toolbar').find('#tcsLoginBtn').should('not.exist');
  });

  it('should show the logout button when user is authenticated', () => {
    cy.defaultLogin();

    cy.get('mat-toolbar').find('#tcsLogoutBtn').should('exist');
  });

  it('should redirect to login screen and show the login button on the header when user logs out', () => {
    cy.defaultLogin();
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:4200/analytics/dashboard')
    });

    cy.get('mat-toolbar').find('#tcsLogoutBtn').click();

    cy.get('mat-toolbar').find('#tcsLoginBtn').should('exist');
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:4200/login')
    });
  });
});
