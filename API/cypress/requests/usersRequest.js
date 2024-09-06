Cypress.Commands.add('sendRequestPostUserSucess', (body) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/usuarios`,
    headers: {
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

Cypress.Commands.add('sendRequestPostUserExpectedFailure', (body, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('baseUrl')}/usuarios`,
    headers: {
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

Cypress.Commands.add('sendRequestGetOneUserDataSet', (userId) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('sendRequestGetOneUserSucess', (userId, body) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('nome', body.nome)
    expect(response.body).to.have.property('email', body.email)
    expect(response.body).to.have.property('password', body.password)
    expect(response.body).to.have.property('administrador', body.administrador)
  })
})

Cypress.Commands.add('sendRequestGetOneUserExpectedFailure', (userId, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestGetListUserSucess', (parameterName, parameterValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/?${parameterName}=${parameterValue}`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.usuarios[0]).to.have.property(parameterName, parameterValue)
  })
})

Cypress.Commands.add('sendRequestGetListUserWithoutParametersSucess', () => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/`,
    headers: {
      'accept': '*/*'
    }
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body.quantidade).to.be.at.least(1)
    expect(response.body.usuarios).to.be.not.null
  })
})

Cypress.Commands.add('sendRequestGetListUserExpectedFailure', (parameter, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'GET',
    url: `${Cypress.env('baseUrl')}/usuarios/${parameter}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('sendRequestPutUserSucess', (userId, body) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: body
  }).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('message', 'Registro alterado com sucesso')
  })
})

Cypress.Commands.add('sendRequestPutUserExpectedFailure', (userId, body, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'PUT',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
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

Cypress.Commands.add('sendRequestDeleteUser', (userId, statusCode, responseField, expectedValue) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('baseUrl')}/usuarios/${userId}`,
    headers: {
      'accept': '*/*'
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.equal(statusCode)
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})
