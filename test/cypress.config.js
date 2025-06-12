const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8081',
    setupNodeEvents(on, config) {
      config.env.EXPO_PUBLIC_FIREBASE_API_KEY =
        process.env.EXPO_PUBLIC_FIREBASE_API_KEY;
      config.env.TEST_USER_EMAIL = process.env.TEST_USER_EMAIL;
      config.env.TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD;
      return config;
    },
  },
});
