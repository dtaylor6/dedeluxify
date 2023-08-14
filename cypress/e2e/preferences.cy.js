const testBackendUrl = 'https://test-dedeluxify-backend.onrender.com';
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

describe('searching for albums', () => {
  beforeEach(() => {
    cy.setCookie('spotify-auth-token', spotifyToken.value);
    cy.visit('/');
  });

  it('at home page', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
  });

  it('search for album', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('thriller');
    cy.get('div#search-results').children('div:first').should('exist');
  });

  it('search for nonsense', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('flksdfjlksdjfsldkfjsdlkfjsdlkfjsdlkfjlsdjfsdlkfj');

    // No results should pop up
    cy.get('div#search-results').children('div:first').should('not.exist');
  });

  it('album window pops up', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('thriller');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').should('exist');
  });

  it('play album', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('thriller');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Play').click();
    });

    // Album div should now be closed
    cy.get('div#album-div').should('not.exist');
  });

  it('queue album', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('thriller');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Queue').click();
    });

    // Album div should now be closed
    cy.get('div#album-div').should('not.exist');
  });
});

describe('album preferences', () => {
  beforeEach(() => {
    cy.request({
      url: `${testBackendUrl}/api/trackPreferences/user`,
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${spotifyToken.value}` }
    });
    cy.setCookie('spotify-auth-token', spotifyToken.value);
    cy.visit('/');
  });

  it('at home page', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
  });
});
