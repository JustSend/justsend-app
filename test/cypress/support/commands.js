// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
//
Cypress.Commands.add('login', (email, password) => {
  const apiKey = Cypress.env('EXPO_PUBLIC_FIREBASE_API_KEY');
  cy.request({
    method: 'POST',
    url: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
    body: {
      email,
      password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(({ body }) => {
    // Store the ID token in localStorage as Firebase does
    window.localStorage.setItem(
      'firebase:authUser:default',
      JSON.stringify({
        uid: body.localId,
        email: body.email,
        stsTokenManager: {
          accessToken: body.idToken,
          refreshToken: body.refreshToken,
          expirationTime: Date.now() + 3600 * 1000,
        },
      })
    );
  });
});
