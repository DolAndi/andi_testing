import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../requests/productRequest'

Cypress.Commands.add('createUserDataSet', (admTrueBodySucess) => {
  cy.sendRequestPostUserSucess(admTrueBodySucess).then((response) => {
    Cypress.env('userId', response.body._id)
  })
})

Cypress.Commands.add('createUserAndLoginDataSet', (admTrueBodySucess) => {
  cy.sendRequestPostUserSucess(admTrueBodySucess).then((response) => {
    Cypress.env('userId', response.body._id)
  })

  cy.sendRequestPostLoginSucess(admTrueBodySucess.email, admTrueBodySucess.password)
})

Cypress.Commands.add('createProductDataSet', (authorization, productBodySucess) => {
  cy.sendRequestPostProductSucess(authorization, productBodySucess)
})

Cypress.Commands.add('helperPutUserConsultOneField', (userId, field, requestFieldValue) => {
  cy.sendRequestGetOneUserDataSet(userId).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property(field, requestFieldValue)
  })
})

Cypress.Commands.add('helperPutUserConsultAllFields', (userId, body) => {
  cy.sendRequestGetOneUserDataSet(userId).then((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('nome', body.nome)
    expect(response.body).to.have.property('email', body.email)
    expect(response.body).to.have.property('password', body.password)
    expect(response.body).to.have.property('administrador', body.administrador)
  })
})

Cypress.Commands.add('helperPutProductConsultOneField', (productId, responseField, expectedValue) => {
  cy.sendRequestGetOneProductDataSet(productId).then((response) => {
    expect(response.body).to.have.property(responseField, expectedValue)
  })
})

Cypress.Commands.add('helperPutProductConsultAllFields', (productId, body) => {
  cy.sendRequestGetOneProductDataSet(productId).then((response) => {
    expect(response.body).to.have.property('nome', body.nome)
    expect(response.body).to.have.property('preco', body.preco)
    expect(response.body).to.have.property('descricao', body.descricao)
    expect(response.body).to.have.property('quantidade', body.quantidade)
  })
})
