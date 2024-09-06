Cypress.Commands.add('sendRequestPostLoginSucess', (email, password) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/login`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: {
      email: email,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'Login realizado com sucesso')
    expect(response.body.authorization).to.not.be.empty
  })
})

Cypress.Commands.add('sendRequestPostLoginExpectedFailure', (email, password, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/login`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: {
      email: email,
      password: password
    }
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})
