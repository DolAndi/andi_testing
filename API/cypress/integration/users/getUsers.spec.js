import '../../requests/usersRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess)
})

describe('Testes do endpoint GET /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por um usuário com ID existente', () => {
      cy.sendRequestGetOneUserSucess(Cypress.env('userId'), admTrueBodySucess)
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um usuário com ID inexistente', () => {
      cy.sendRequestGetOneUserExpectedFailure(`${Cypress.env('userId')}_123`, 400, 'message', 'Usuário não encontrado')
    })
  })
})

describe('Testes do endpoint (Lista) GET /usuarios/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por usuários com o parâmetro ID', () => {
      cy.sendRequestGetListUserSucess('_id', Cypress.env('userId'))
    })

    it('Buscar por usuários com o parâmetro Nome', () => {
      cy.sendRequestGetListUserSucess('nome', admTrueBodySucess.nome)
    })

    it('Buscar por usuários com o parâmetro E-mail', () => {
      cy.sendRequestGetListUserSucess('email', admTrueBodySucess.email)
    })

    it('Buscar por usuários com o parâmetro Administrador', () => {
      cy.sendRequestGetListUserSucess('administrador', admTrueBodySucess.administrador)
    })

    it('Buscar por usuários sem utilizar parâmetros', () => {
      cy.sendRequestGetListUserWithoutParametersSucess()
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por usuários com um parâmetro inexistente', () => {
      cy.sendRequestGetListUserExpectedFailure('?parametroInexistente=123', 400, 'parametroInexistente', 'parametroInexistente não é permitido')
    })
  })
})
