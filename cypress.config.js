const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zy18h2',
  e2e: {
    baseUrl: 'http://localhost:3000',
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
