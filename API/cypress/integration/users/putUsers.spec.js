import '../../requests/usersRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import {
  faker
} from '@faker-js/faker'

const admTrueBodySucess = userPostRequestBody('true')
let userId = 'string'

before(() => {
  cy.createUserDataSet(admTrueBodySucess).then(() => {
    userId = Cypress.env('userId')
  })
})

describe('Testes do endpoint PUT /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Editar o campo Nome de um usuário', () => {
      let newValue = faker.person.fullName()

      cy.helperPutUserConsultOneField(userId, 'nome', admTrueBodySucess.nome)
      admTrueBodySucess['nome'] = newValue

      cy.sendRequestPutUserSucess(userId, admTrueBodySucess)

      cy.helperPutUserConsultOneField(userId, 'nome', newValue)
    })

    it('Editar o campo E-mail de um usuário', () => {
      let newValue = faker.internet.email()

      cy.helperPutUserConsultOneField(userId, 'email', admTrueBodySucess.email).then(() => {
        admTrueBodySucess['email'] = newValue
      })

      cy.sendRequestPutUserSucess(userId, admTrueBodySucess)

      cy.helperPutUserConsultOneField(userId, 'email', newValue)
    })

    it('Editar o campo Password de um usuário', () => {
      let newValue = faker.internet.password()
      cy.helperPutUserConsultOneField(userId, 'password', admTrueBodySucess.password).then(() => {
        admTrueBodySucess['password'] = newValue
      })

      cy.sendRequestPutUserSucess(userId, admTrueBodySucess)

      cy.helperPutUserConsultOneField(userId, 'password', newValue)
    })

    it('Editar o campo Administrador de um usuário', () => {
      let newValue = 'false'
      cy.helperPutUserConsultOneField(userId, 'administrador', admTrueBodySucess.administrador).then(() => {
        admTrueBodySucess['administrador'] = newValue
      })

      cy.sendRequestPutUserSucess(userId, admTrueBodySucess)

      cy.helperPutUserConsultOneField(userId, 'administrador', newValue)
    })

    it('Editar todos os campos de um usuário', () => {
      let newValuesJson = {
        nome: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
      }

      cy.helperPutUserConsultAllFields(userId, admTrueBodySucess).then(() => {
        admTrueBodySucess['nome'] = newValuesJson.nome
        admTrueBodySucess['email'] = newValuesJson.email
        admTrueBodySucess['password'] = newValuesJson.password
        admTrueBodySucess['administrador'] = newValuesJson.administrador
      })

      cy.sendRequestPutUserSucess(userId, admTrueBodySucess)

      cy.helperPutUserConsultAllFields(userId, newValuesJson)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar enviar com o campo Nome vazio', () => {
      cy.helperPutUserConsultOneField(userId, 'nome', admTrueBodySucess.nome).then(() => {
        admTrueBodySucess['nome'] = ''
      })

      cy.sendRequestPutUserExpectedFailure(userId, admTrueBodySucess, 400, 'nome', 'nome não pode ficar em branco')
    })

    it('Tentar enviar com o campo E-mail vazio', () => {
      cy.helperPutUserConsultOneField(userId, 'email', admTrueBodySucess.email).then(() => {
        admTrueBodySucess['email'] = ''
      })

      cy.sendRequestPutUserExpectedFailure(userId, admTrueBodySucess, 400, 'email', 'email não pode ficar em branco')
    })
  })
})
