describe('Phonebook App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:8000/api/testing/reset');
    cy.visit('http://localhost:8000');
  });

  it('can add a new contact to the phonebook', () => {
    cy.get('#name-field').type('emil');
    cy.get('#number-field').type('123-999999');
    cy.get('#submit-button').click();

    cy.get('.contacts').contains('emil');
    cy.get('.contacts').contains('123-999999');
  });

  it('show an error notification when name is not specified', function () {
    cy.get('#number-field').type('123-999999');
    cy.get('#submit-button').click();

    cy.get('.error').contains('Contact validation failed');
  });

  it('show an error notification when number is not specified', function () {
    cy.get('#name-field').type('emil');
    cy.get('#submit-button').click();

    cy.get('.error').contains('Contact validation failed');
  });

  describe('when there are multiple contact in the phonebook', function () {
    beforeEach(function () {
      cy.addContact({ name: 'emil', number: '123-999999' });
      cy.addContact({ name: 'asd', number: '000-000000' });
    });

    it('can filter names shown in the phonebook', () => {
      cy.get('#filter-field').type('e');
      cy.get('.contacts').contains('emil');
      cy.get('.contacts').should('not.contain', 'asd');
    });

    it('can update a number given an existing name', function () {
      cy.get('#name-field').type('emil');
      cy.get('#number-field').type('777-777777');
      cy.get('#submit-button').click();

      cy.on('window:confirm', () => true);

      cy.contains('777-777777');
    });
  });
});
