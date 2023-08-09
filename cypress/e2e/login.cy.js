describe('template spec', () => {
  it('visit login page', () => {
    cy.visit('/login');
  });

  it('log in to preview', () => {
    cy.visit('/login');
    cy.get('#preview-login-button').click();
    cy.get('input[type="search"]');
  });

  it('visit spotify log in page', () => {
    cy.visit('/login');
    cy.get('#spotify-login-button').click();
    cy.origin('https://accounts.spotify.com', () => {
      cy.get('input#login-username');
      cy.get('input#login-password');
      cy.get('button#login-button');
    });
  });
});
