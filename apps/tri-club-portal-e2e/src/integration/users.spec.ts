import { getSectionsHeadings } from '../support/app.po';

describe('tri-club-portal', () => {
  describe('User Registration', () => {
    beforeEach(() => cy.visit('user/register'));

    it('should display welcome message', () => {
      // Custom command example, see `../support/commands.ts` file
      // cy.login('my-email@something.com', 'myPassword');

      // Function helper example, see `../support/app.po.ts` file
      getSectionsHeadings().contains('Create an Account');
    });
  });
});
