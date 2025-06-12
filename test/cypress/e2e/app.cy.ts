describe('App', () => {
  beforeEach(() => {
    cy.login(
      Cypress.env('TEST_USER_EMAIL'),
      Cypress.env('TEST_USER_PASSWORD')
    ).then(() => {
      cy.visit('/');
    });
  });

  it('should load the app successfully', () => {
    cy.then(() => {
      cy.get('body').should('be.visible');
    });
  });

  it('should have basic navigation elements', () => {
    cy.then(() => {
      cy.get('nav').should('exist');
    });
  });

  it('should handle basic user interactions', () => {
    cy.then(() => {
      cy.get('button').should('exist');
      cy.get('input').should('exist');
    });
  });
});
