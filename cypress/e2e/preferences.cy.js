const networkFails = [];

const saveNetworkFails = () => {
  cy.writeFile('cypress/fixtures/networkFails.json', networkFails);
};

describe('querying', () => {
  before(() => {
    cy.visit('/login');
    cy.get('#spotify-login-button').click();

    // Redirect to Spotify login page
    cy.origin('https://accounts.spotify.com', () => {
      const email = Cypress.env('spotify_email');
      const password = Cypress.env('spotify_password');
      cy.get('input#login-username').type(email, { log: false });
      cy.get('input#login-password').type(password, { log: false });
      cy.get('button#login-button').click();
    });

    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('At home page', () => {
    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
  });

  it('Get album window', () => {
    cy.intercept('*', (request) => {
      request.continue(response => {
        if(response.statusMessage !== 'OK') {
          networkFails.push({ request, response });
        }
      });
    });

    cy.url().should('contain', 'localhost');
    cy.get('#spotify-player');
    // const searchBar = cy.get('input[type="search"]');
    // searchBar.within(() => {
    //   cy.get('div button:first').click();
    // });
  });
});

after(() => {
  saveNetworkFails();
});