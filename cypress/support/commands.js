Cypress.Commands.add('addContact', ({ name, number }) => {
  cy.request({
    url: 'http://localhost:8000/api/contacts',
    method: 'POST',
    body: { name, number },
  });

  cy.visit('http://localhost:8000');
});
