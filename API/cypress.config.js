const {
  defineConfig
} = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config
    },
    retries: {
      runMode: 0,
      openMode: 0
    },
    specPattern: 'cypress/integration/*/*.js',
    video: false,
    reporter: 'mochawesome',
    reporterOptions: {
      mochaFile: 'results/my-test-output.xml',
      reportDir: 'cypress/reports/mochawesome-report',
      toConsole: true,
      reportFilename: '[status]_[datetime]-[name]-report',
      overwrite: false,
      html: false,
      json: true,
      reportTitle: 'output-tests',
      cdn: true,
      charts: true
    }
  },
  env: {
    baseUrl: 'https://serverest.dev',
    userId: 'string'
  }
})
