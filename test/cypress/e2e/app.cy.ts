describe('App', () => {
  before(() => {
    cy.loginCypress(
      Cypress.env('TEST_REGISTER_EMAIL'),
      Cypress.env('TEST_REGISTER_PASSWORD')
    );
  });

  it('should load the app successfully', () => {
    cy.then(() => {
      cy.get('body').should('be.visible');
    });
  });
});
