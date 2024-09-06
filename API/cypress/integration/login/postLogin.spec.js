import '../../requests/usersRequest'
import '../../requests/loginRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')

before(() => {
  cy.createUserDataSet(admTrueBodySucess)
})

describe('Testes do endpoint POST /login', () => {
  context('Cenários de sucesso', () => {
    it('Realizar o login com o usuário criado', () => {
      cy.sendRequestPostLoginSucess(admTrueBodySucess.email, admTrueBodySucess.password)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar realizar o login com um e-mail inválido', () => {
      cy.sendRequestPostLoginExpectedFailure(`${admTrueBodySucess.email}z`, admTrueBodySucess.password, 400, 'email', 'email deve ser um email válido')
    })

    it('Tentar realizar o login com o e-mail incorreto', () => {
      cy.sendRequestPostLoginExpectedFailure(`z${admTrueBodySucess.email}`, admTrueBodySucess.password, 401, 'message', 'Email e/ou senha inválidos')
    })

    it('Tentar realizar o login com a senha incorreta', () => {
      cy.sendRequestPostLoginExpectedFailure(admTrueBodySucess.email, `${admTrueBodySucess.password}123`, 401, 'message', 'Email e/ou senha inválidos')
    })
  })
})
