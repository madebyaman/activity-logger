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

  // Dashboard page = add activities, create new activities
  // Create new activity
  cy.get('.blocks').first().click();
  cy.findByRole('button', { name: /or create a new activity/i }).click();
  cy.findByRole('textbox', { name: /activity name/i })
    .wait(500)
    .type('Programming');
  cy.findByRole('combobox').wait(300).select('Productive');
  cy.findByRole('button', { name: /submit activity/i }).click();
  // Select newly added activity
  cy.findByRole('combobox').wait(300).select('Programming');
  cy.findByRole('textbox', { name: /notes/i }).wait(500).type('Testing');
  cy.findByRole('button', { name: /submit/i }).click();
  cy.get('.blocks')
    .first()
    .within(() => {
      cy.get('span').eq(1).contains('Programming');
    });

  // Activities page = view, edit and delete activities
  cy.findByRole('link', { name: /activities/i }).click();
  cy.findByRole('link', { name: /programming/i }).click();
  cy.get('ul>li').first().contains('6:00 AM');
  cy.findByRole('button', { name: /close panel/i }).click();
  cy.findByRole('row', { name: /programming productive edit delete/i }).within(
    () => {
      cy.findByRole('button', { name: /edit/i }).click();
    }
  );
  cy.findByRole('cell', { name: /programming/i }).within(() => {
    cy.findByRole('textbox').clear().wait(500).type('Development');
  });
  cy.findByRole('button', { name: /save/i }).click();
  cy.findByRole('row', { name: /development productive edit delete/i }).should(
    'exist'
  );
  cy.findByRole('row', { name: /work very productive edit delete/i }).within(
    () => {
      cy.findByRole('button', { name: /delete/i }).click();
    }
  );
  cy.findByRole('row', { name: /work very productive edit delete/i }).should(
    'not.exist'
  );

  // Reports page = view report
  cy.findByRole('link', { name: /reports/i }).click();
  cy.findByText(/15 minutes/i);

  // Preferences page = update profile
  cy.findByRole('link', { name: /your preferences/i }).click();
  cy.findByRole('textbox', { name: /first name/i })
    .clear()
    .wait(500)
    .type('Leo');
  cy.findByRole('textbox', { name: /last name/i })
    .clear()
    .wait(500)
    .type('Messi');
  cy.findByRole('button', { name: /save/i }).click();
  cy.findByRole('textbox', { name: /first name/i }).should('have.value', 'Leo');

  // Sign out
  cy.findByRole('button', { name: /open user menu/i }).click();
  cy.findByRole('menuitem', { name: /sign out/i }).click();

  cy.url().should('include', '/signin');
});

export {};
