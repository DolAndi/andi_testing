import '../../requests/usersRequest'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const admFalseBodySucess = userPostRequestBody('false')
const emptyNameFailRequestBody = userPostRequestBody('false')
const fieldWithIncorrectValueRequestBody = userPostRequestBody('false')

describe('Testes do endpoint POST /usuarios', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um novo usuário com nível administrador', () => {
      cy.sendRequestPostUserSucess(admTrueBodySucess)
    })

    it('Cadastrar um novo usuário com nível básico', () => {
      cy.sendRequestPostUserSucess(admFalseBodySucess)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar Cadastrar um novo usuário com o campo Nome vazio', () => {
      emptyNameFailRequestBody.nome = ''
      cy.sendRequestPostUserExpectedFailure(emptyNameFailRequestBody, 400, 'nome', 'nome não pode ficar em branco')
    })

    it('Tentar Cadastrar um novo usuário com o campo Administrador do tipo string com o valor booleano', () => {
      fieldWithIncorrectValueRequestBody.administrador = true
      cy.sendRequestPostUserExpectedFailure(fieldWithIncorrectValueRequestBody, 400, 'administrador', "administrador deve ser 'true' ou 'false'")
    })
  })
})
