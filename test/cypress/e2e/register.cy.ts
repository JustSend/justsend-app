describe('Register user', () => {
  const email: string = Cypress.env('TEST_REGISTER_EMAIL');
  const password: string = Cypress.env('TEST_REGISTER_PASSWORD');

  it('should load the register form', () => {
    cy.visit('/register');
    cy.get('[data-testid="Email Input"]').should('exist');
    cy.get('[data-testid="Password Input"]').should('exist');
    cy.get('[data-testid="Register Button"]').should('exist');
    cy.get('[data-testid="Sign In Button"]').should('exist');
  });

  /* Change the credentials after running the test. */
  it('should register a new user successfully', () => {
    cy.visit('/register');
    cy.get('[data-testid="Email Input"]').type(email);
    cy.get('[data-testid="Password Input"]').type(password);
    cy.get('[data-testid="Register Button"]').click();
    cy.get('[data-testid="Error Message"]').should('not.exist');
  });

  it('registering user with used email should fail', () => {
    cy.visit('/register');
    cy.get('[data-testid="Email Input"]').type(email);
    cy.get('[data-testid="Password Input"]').type(password);
    cy.get('[data-testid="Register Button"]').click();
    cy.get('[data-testid="Error Message"]').should('exist');
  });

  it('registering with an empty email should fail', () => {
    cy.visit('/register');
    cy.get('[data-testid="Email Input"]').type('a');
    cy.get('[data-testid="Password Input"]').type(password);
    cy.get('[data-testid="Register Button"]').click();
    cy.get('[data-testid="Error Message"]').should('exist');
  });

  it('registering with a weak password should fail', () => {
    cy.visit('/register');
    cy.get('[data-testid="Email Input"]').type(email);
    cy.get('[data-testid="Password Input"]').type('abc');
    cy.get('[data-testid="Register Button"]').click();
    cy.get('[data-testid="Error Message"]').should('exist');
  });
});
