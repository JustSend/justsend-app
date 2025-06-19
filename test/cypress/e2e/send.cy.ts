describe('Send Money Screen', () => {
  before(() => {
    cy.loginCypress(
      Cypress.env('TEST_REGISTER_EMAIL'),
      Cypress.env('TEST_REGISTER_PASSWORD')
    );
  });

  beforeEach(() => {
    cy.visit('/send');
  });

  it('renders the send form', () => {
    cy.contains('Send Money').should('be.visible');
    cy.get('input[placeholder="Search by email or alias"]').should('exist');
    cy.get('input[placeholder="Enter amount"]').should('exist');
    cy.contains('Send Money').should('exist');
  });

  it('shows error for empty fields', () => {
    cy.contains('Send Money').click();
    cy.get('input[placeholder="Search by email or alias"]').should(
      'have.css',
      'border-color'
    );
    cy.get('input[placeholder="Enter amount"]').should(
      'have.css',
      'border-color'
    );
  });

  it('shows error for invalid amount', () => {
    cy.get('input[placeholder="Search by email or alias"]').type(
      'test@example.com'
    );
    cy.get('input[placeholder="Enter amount"]').type('-10');
    cy.contains('Send Money').click();
    cy.get('input[placeholder="Enter amount"]').should(
      'have.css',
      'border-color'
    );
  });

  it('submits send successfully', () => {
    cy.intercept('POST', '/api/wallet/send', {
      statusCode: 200,
      body: { success: true },
    }).as('send');
  });
});
