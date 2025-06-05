describe('Authentication', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show login form when not authenticated', () => {
    // Check for login form elements
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.get('button')
      .contains(/sign in|login/i)
      .should('exist');
  });

  it('should handle login with valid credentials', () => {
    // Replace these with your test credentials
    const email = Cypress.env('TEST_USER_EMAIL');
    const password = Cypress.env('TEST_USER_PASSWORD');

    if (!email || !password) {
      cy.log('Test credentials not found in environment variables');
      return;
    }

    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button')
      .contains(/sign in|login/i)
      .click();

    // Wait for authentication to complete
    cy.wait(2000);

    // Check if we're redirected to the main app
    cy.url().should('not.include', '/login');
  });

  it('should show error message with invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.get('button')
      .contains(/sign in|login/i)
      .click();

    // Check for error message
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
