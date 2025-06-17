describe('DEBIN Deposit Screen', () => {
  before(() => {
    cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PASSWORD'));
  });

  beforeEach(() => {
    cy.visit('/deposit');
  });

  it('renders the deposit form', () => {
    cy.contains('DEBIN Deposit').should('be.visible');
    cy.get('input[placeholder="Enter routing number"]').should('exist');
    cy.get('input[placeholder="Enter amount"]').should('exist');
    cy.contains('Deposit with DEBIN').should('exist');
  });

  it('shows error for empty fields', () => {
    cy.contains('Deposit with DEBIN').click();
    cy.get('input[placeholder="Enter routing number"]').should(
      'have.css',
      'border-color'
    );
    cy.get('input[placeholder="Enter amount"]').should(
      'have.css',
      'border-color'
    );
  });

  it('shows error for invalid routing number', () => {
    cy.get('input[placeholder="Enter routing number"]').type('123');
    cy.get('input[placeholder="Enter amount"]').type('100');
    cy.contains('Deposit with DEBIN').click();
    cy.get('input[placeholder="Enter routing number"]').should(
      'have.css',
      'border-color'
    );
  });

  it('shows error for invalid amount', () => {
    cy.get('input[placeholder="Enter routing number"]').type('123456789');
    cy.get('input[placeholder="Enter amount"]').type('-10');
    cy.contains('Deposit with DEBIN').click();
    cy.get('input[placeholder="Enter amount"]').should(
      'have.css',
      'border-color'
    );
  });
});
