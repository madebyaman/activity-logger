/// <reference types="Cypress" />
it('displays correct heading when visiting signin page', async () => {
  cy.visit('/');
  cy.findByRole('link', { name: /login/i }).click();
  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'exist'
  );
});

export {};
