describe('Authentication', () => {
  it('should show login form when not authenticated', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('[data-testid="Login Button"]').should('exist');
  });

  it('should handle login with valid credentials', () => {
    cy.visit('/login');
    const email = Cypress.env('TEST_REGISTER_EMAIL');
    const password = Cypress.env('TEST_REGISTER_PASSWORD');

    if (!email || !password) {
      cy.log('Test credentials not found in environment variables');
      return;
    }

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('[data-testid="Login Button"]').click();

    // Wait for authentication to complete
    cy.wait(2000);

    cy.url().should('not.include', '/login');
  });
});
