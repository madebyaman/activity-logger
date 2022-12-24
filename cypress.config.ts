import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    env: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASSWORD,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // return require('./cypress/plugins/index.js')(on, config)
    },
  },
});
