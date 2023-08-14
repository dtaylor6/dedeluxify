let spotifyToken;

describe('authorization', () => {
  it('visit login page', () => {
    cy.visit('/login');
  });

  it('log in to preview', () => {
    cy.visit('/login');
    cy.get('#preview-login-button').click();
    cy.get('input[type="search"]');
  });

  it('log into spotify page', () => {
    cy.visit('/login');
    cy.get('#spotify-login-button').click();
    cy.origin('https://accounts.spotify.com', () => {
      cy.get('input#login-username').type(Cypress.env('spotify_email'), { log: false });
      cy.get('input#login-password').type(Cypress.env('spotify_password'), { log: false });
      cy.get('button#login-button').click();
    });

    // Should redirect back to main website page
    cy.get('#spotify-player');
    cy.getCookie('spotify-auth-token')
      .should('exist')
      .then((c) => {
        spotifyToken = c;
      });
  });
});


describe('querying', () => {
  beforeEach(() => {
    cy.setCookie('spotify-auth-token', spotifyToken.value);
    cy.visit('/');
  });

  it('At home page', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
  });

  it('Get album window', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    // const searchBar = cy.get('input[type="search"]');
    // searchBar.within(() => {
    //   cy.get('div button:first').click();
    // });
  });
});
