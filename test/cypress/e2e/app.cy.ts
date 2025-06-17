describe('App', () => {
  before(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
  });

  it('should load the app successfully', () => {
    cy.then(() => {
      cy.get('body').should('be.visible');
    });
  });
});
