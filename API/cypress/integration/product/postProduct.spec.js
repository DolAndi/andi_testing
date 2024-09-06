import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const admFalseBodySucess = userPostRequestBody('false')
const productBodySucess = productPostRequestBody()

let authorization = 'string'
let authorizationNotAdm = 'string'

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
  cy.createUserAndLoginDataSet(admFalseBodySucess).then((response) => {
    authorizationNotAdm = response.body.authorization
  })
})

describe('Testes do endpoint POST /produtos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um novo produto', () => {
      cy.sendRequestPostProductSucess(authorization, productBodySucess)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar cadastrar um produto já existente', () => {
      cy.sendRequestPostProductExpectedFailure(authorization, productBodySucess, 400, 'message', 'Já existe produto com esse nome')
    })

    it('Tentar cadastrar um produto com o preço 0 (zero)', () => {
      const productBody = productPostRequestBody()
      productBody['preco'] = 0
      cy.sendRequestPostProductExpectedFailure(authorization, productBody, 400, 'preco', 'preco deve ser um número positivo')
    })

    it('Tentar cadastrar um produto com o campo nome vazio', () => {
      const productBody = productPostRequestBody()
      productBody['nome'] = ''
      cy.sendRequestPostProductExpectedFailure(authorization, productBody, 400, 'nome', 'nome não pode ficar em branco')
    })

    it('Tentar cadastrar um produto com uma autorização inválida', () => {
      cy.sendRequestPostProductExpectedFailure(`${authorization}z`, productBodySucess, 401, 'message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })

    it('Tentar cadastrar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPostProductExpectedFailure(authorizationNotAdm, productBodySucess, 403, 'message', 'Rota exclusiva para administradores')
    })
  })
})
