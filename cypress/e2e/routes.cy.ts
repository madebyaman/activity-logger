/// <reference types="Cypress" />
it('end to end for entire workflow', async () => {
  cy.visit('/');
  cy.findByRole('link', { name: /login/i }).click();
  cy.findByRole('heading', { name: /sign in to your account/i }).should(
    'exist'
  );

  // Signin page
  if (!Cypress.env('email') || !Cypress.env('password'))
    throw new Error('No email or password provided in env');
  const passwordField = cy.findByLabelText(/password/i);
  passwordField.wait(500).type(Cypress.env('password'));
  const emailFied = cy.findByLabelText(/email address/i);
  emailFied.wait(700).type(Cypress.env('email'));
  cy.findByRole('button', { name: /sign in/i }).click();
  cy.url().should('include', '/dashboard');

  // Dashboard page
});

export {};
