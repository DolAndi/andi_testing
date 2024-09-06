Cypress.Commands.add('sendRequestPostProductSucess', (authorization, body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/produtos`,
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

Cypress.Commands.add('sendRequestPostProductExpectedFailure', (authorization, body, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/produtos`,
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

Cypress.Commands.add('sendRequestPutProductSucess', (productId, authorization, body) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'authorization': authorization,
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
  })
})

Cypress.Commands.add('sendRequestPutProductExpectedFailure', (productId, authorization, body, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
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

Cypress.Commands.add('sendRequestGetOneProductDataSet', (productId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
  })
})

Cypress.Commands.add('sendRequestGetOneProductSucess', (productId, body) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('nome', body.nome)
    expect(response.body).to.have.property('preco', body.preco)
    expect(response.body).to.have.property('descricao', body.descricao)
    expect(response.body).to.have.property('quantidade', body.quantidade)
  })
})

Cypress.Commands.add('sendRequestGetOneProductExpectedFailure', (productId, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestGetListProductSucess', (parameterName, parameterValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/?${parameterName}=${parameterValue}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.produtos[0]).to.have.property(parameterName, parameterValue)
  })
})

Cypress.Commands.add('sendRequestGetListProductWithoutParametersSucess', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.produtos).to.be.not.null
  })
})

Cypress.Commands.add('sendRequestGetListProductExpectedFailure', (parameter, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/produtos/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestDeleteProduct', (productId, authorization, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/produtos/${productId}`,
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
