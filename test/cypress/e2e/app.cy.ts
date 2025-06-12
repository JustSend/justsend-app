describe('App', () => {
  beforeEach(() => {
    // Programmatic login before visiting the home page
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
    cy.visit('/');
  });

  it('should load the app successfully', () => {
    // Check if the app container is visible
    cy.get('body').should('be.visible');
  });

  it('should have basic navigation elements', () => {
    // Check for common navigation elements
    cy.get('nav').should('exist');
  });

  it('should handle basic user interactions', () => {
    // Example of checking for interactive elements
    cy.get('button').should('exist');
    cy.get('input').should('exist');
  });
});
