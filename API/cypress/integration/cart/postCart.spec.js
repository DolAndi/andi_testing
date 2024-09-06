import '../../requests/productRequest'
import '../../requests/cartRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'
import cartBodyFunction from '../../support/dataSet/cartBody'

const admTrueBodySucess = userPostRequestBody('true')
const admTrueBodySucessTwo = userPostRequestBody('true')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let authorizationTwo = 'string'
let productId = ''
let cartBody = {}

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
  cy.createUserAndLoginDataSet(admTrueBodySucessTwo).then((response) => {
    authorizationTwo = response.body.authorization
  })
})

describe('Testes do endpoint POST /carrinhos', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('cadastrar um novo carrinho', () => {
      cartBody = cartBodyFunction('sucess', productId)
      cy.sendRequestPostCartSucess(authorization, cartBody)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar cadastrar mais de um carrinho para o usuário', () => {
      cy.sendRequestPostCartExpectedFailure(authorization, cartBody, 400, 'message', 'Não é permitido ter mais de 1 carrinho')
    })

    it('Tentar cadastrar um carrinho com produto duplicado', () => {
      cartBody = cartBodyFunction('productDuplicate', productId)
      cy.sendRequestPostCartExpectedFailure(authorizationTwo, cartBody, 400, 'message', 'Não é permitido possuir produto duplicado')
    })

    it('Tentar cadastrar um carrinho com produto inexistente', () => {
      cartBody = cartBodyFunction('nonExistentProduct', '01')
      cy.sendRequestPostCartExpectedFailure(authorizationTwo, cartBody, 400, 'message', 'Produto não encontrado')
    })

    it('Tentar cadastrar um carrinho com produto que não possui quantidade suficiente', () => {
      cartBody = cartBodyFunction('insufficientAmountProduct', productId)
      cy.sendRequestPostCartExpectedFailure(authorizationTwo, cartBody, 400, 'message', 'Produto não possui quantidade suficiente')
    })

    it('Tentar cadastrar um novo carrinho com uma autorização inválida', () => {
      cy.sendRequestPostCartExpectedFailure(`${authorizationTwo}z`, cartBody, 401, 'message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})
