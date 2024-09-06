import '../../requests/usersRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

before(() => {
  const admTrueBodySucess = userPostRequestBody('true')
  cy.createUserAndLoginDataSet(admTrueBodySucess)
})

describe('Testes do endpoint DELETE /usuarios/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Excluir um usuário com ID existente', () => {
      cy.sendRequestDeleteUser(Cypress.env('userId'), 200, 'message', 'Registro excluído com sucesso')
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um usuário já excluído', () => {
      cy.sendRequestDeleteUser(Cypress.env('userId'), 404, 'message', 'Nenhum registro excluído')
    })

    it('Tentar excluir um usuário com ID inexistente', () => {
      cy.sendRequestDeleteUser('01', 404, 'message', 'Nenhum registro excluído')
    })
  })
})
