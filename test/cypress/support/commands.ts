/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    login(email?: string, password?: string): Chainable<void>;
    loginCypress(email?: string, password?: string): Chainable<void>;
  }
}

Cypress.Commands.add('login', (email?: string, password?: string) => {
  const userEmail = email || Cypress.env('TEST_USER_EMAIL');
  const userPassword = password || Cypress.env('TEST_USER_PASSWORD');

  cy.visit('/login');
  cy.wait(1000); // Wait for initial render

  // Get and store email input
  cy.get('[data-testid="Email Input"]')
    .should('be.visible')
    .should('not.be.disabled')
    .as('emailInput');

  // Type email
  cy.get('@emailInput').type(userEmail);

  // Get and store password input
  cy.get('input[type="password"]')
    .should('be.visible')
    .should('not.be.disabled')
    .as('passwordInput');

  // Type password
  cy.get('@passwordInput').type(userPassword);

  // Get and store login button
  cy.get('[data-testid="Login Button"]')
    .should('be.visible')
    .should('not.be.disabled')
    .as('loginButton');

  // Click login button
  cy.get('@loginButton').click();

  // Wait for navigation
  cy.url().should('not.include', '/login');
});

Cypress.Commands.add('loginCypress', () => {
  const email = Cypress.env('TEST_REGISTER_EMAIL');
  const password = Cypress.env('TEST_REGISTER_PASSWORD');
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('[data-testid="Login Button"]').click();
});
