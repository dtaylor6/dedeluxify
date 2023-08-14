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
  // Set auth token before each test
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
  // Clear all user preferences and set auth token before each test
  beforeEach(() => {
    cy.request({
      url: `${testBackendUrl}/api/trackPreferences/user`,
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${spotifyToken.value}` }
    });
    cy.setCookie('spotify-auth-token', spotifyToken.value);
    cy.visit('/');
  });

  it('search for album', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('nevermind');
    cy.get('div#search-results').children('div:first').should('exist');
  });

  it('get track preference', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('nevermind');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Set Tracks').click();
      cy.get('label').contains('Smells Like Teen Spirit').should('exist');
    });
  });

  it('all tracks should initially be enabled', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('nevermind');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Set Tracks').click();
      cy.get('label').contains('Smells Like Teen Spirit').should('exist');
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        cy.wrap($input).should('be.checked');
      });
    });
  });

  it('set album preference', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('nevermind');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Set Tracks').click();
      cy.get('label').contains('Smells Like Teen Spirit').should('exist');

      // Disable first three tracks
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        cy.wrap($input).should('be.checked');
        if (index < 3) {
          cy.wrap($input).uncheck();
        }
      });
      cy.get('button').contains('Save Preferences').click();

      // Retrieve new preferences from database and ensure correctness
      cy.get('button').contains('Set Tracks').click();
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        if (index < 3) {
          cy.wrap($input).should('not.be.checked');
        }
        else {
          cy.wrap($input).should('be.checked');
        }
      });
    });
  });

  it('delete album preference', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    cy.get('div#album-div').should('not.exist');
    cy.get('input[type="search"]').type('nevermind');
    cy.get('div#search-results').children('div:first').click();
    cy.get('div#album-div').within(($div) => {
      cy.get('button').contains('Set Tracks').click();
      cy.get('label').contains('Smells Like Teen Spirit').should('exist');

      // Disable first three tracks
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        cy.wrap($input).should('be.checked');
        if (index < 3) {
          cy.wrap($input).uncheck();
        }
      });
      cy.get('button').contains('Save Preferences').click();

      // Retrieve new preferences from database and ensure correctness
      cy.get('button').contains('Set Tracks').click();
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        if (index < 3) {
          cy.wrap($input).should('not.be.checked');
        }
        else {
          cy.wrap($input).should('be.checked');
        }
      });

      // Delete the preferences and ensure all tracks are reenabled
      cy.get('button').contains('Delete Preferences').click();
      cy.get('button').contains('Set Tracks').click();
      cy.get('input[type="checkbox"]').each(($input, index, $list) => {
        cy.wrap($input).should('be.checked');
      });
    });
  });
});
