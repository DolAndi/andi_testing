Cypress.Commands.add('sendRequestPostCart', (authorization, body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/carrinhos`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body
  })
})

Cypress.Commands.add('sendRequestPostCartSucess', (authorization, body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/carrinhos`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }).then((response) => {
    expect(response.status).to.equal(201)
    expect(response.body).to.have.property('message', 'Cadastro realizado com sucesso')
    expect(response.body._id).to.not.be.empty
  })
})

Cypress.Commands.add('sendRequestPostCartExpectedFailure', (authorization, body, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/carrinhos`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    failOnStatusCode: false,
    body: body
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestDeleteCancelCart', (authorization, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/carrinhos/cancelar-compra`,
    headers: {
      'authorization': authorization,
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestDeleteFinishCart', (authorization, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/carrinhos/concluir-compra`,
    headers: {
      'authorization': authorization,
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestGetOneCartSucess', (cartId, productId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/${cartId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.produtos[0]).to.have.property('idProduto', productId)
  })
})

Cypress.Commands.add('sendRequestGetOneCartExpectedFailure', (cartId, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/${cartId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestGetListCartSucess', (parameterName, parameterValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/?${parameterName}=${parameterValue}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.carrinhos).to.be.not.null
  })
})

Cypress.Commands.add('sendRequestGetListCartWithoutParametersSucess', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.carrinhos).to.be.not.null
  })
})

Cypress.Commands.add('sendRequestGetListCartUserExpectedFailure', (parameter, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/carrinhos/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})
