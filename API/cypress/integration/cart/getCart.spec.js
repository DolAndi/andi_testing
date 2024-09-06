import '../../requests/productRequest'
import '../../requests/cartRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'
import cartBodyFunction from '../../support/dataSet/cartBody'

const admTrueBodySucess = userPostRequestBody('true')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let productId = ''
let cartId = ''

let cartBody = {}

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint GET /carrinhos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('cadastrar um novo carrinho para as consultas', () => {
      cartBody = cartBodyFunction('sucess', productId)
      cy.sendRequestPostCart(authorization, cartBody).then((response) => {
        cartId = response.body._id
      })
    })

    it('Buscar por um carrinho com ID existente', () => {
      cy.sendRequestGetOneCartSucess(cartId, productId)
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um carrinho com ID inexistente', () => {
      cy.sendRequestGetOneCartExpectedFailure(`${cartId}_123`, 400, 'message', 'Carrinho não encontrado')
    })
  })
})

describe('Testes do endpoint (Lista) GET /carrinhos/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por carrinhos com o parâmetro ID', () => {
      cy.sendRequestGetListCartSucess('_id', cartId)
    })

    it('Buscar por carrinhos com o parâmetro Preço Total', () => {
      cy.sendRequestGetListCartSucess('precoTotal', productBodySucess.preco)
    })

    it('Buscar por carrinhos com o parâmetro Quantidade Total', () => {
      cy.sendRequestGetListCartSucess('quantidadeTotal', cartBody.produtos[0].quantidade)
    })

    it('Buscar por carrinhos com o parâmetro Id Usuário', () => {
      cy.sendRequestGetListCartSucess('idUsuario', Cypress.env('userId'))
    })

    it('Buscar por carrinhos sem utilizar parâmetros', () => {
      cy.sendRequestGetListCartWithoutParametersSucess()
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um carrinho com um parâmetro inexistente', () => {
      cy.sendRequestGetListCartUserExpectedFailure('?parametroInexistente=123', 400, 'parametroInexistente', 'parametroInexistente não é permitido')
    })
  })
})
