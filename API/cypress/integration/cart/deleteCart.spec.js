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
let cartBody = {}

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint DELETE /carrinhos/cancelar-compra', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para adicionar ao carrinho', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('cadastrar um novo carrinho para a exclusão', () => {
      cartBody = cartBodyFunction('sucess', productId)
      cy.sendRequestPostCart(authorization, cartBody)
    })

    it('Excluir um carrinho existente', () => {
      cy.sendRequestDeleteCancelCart(authorization, 200, 'message', 'Registro excluído com sucesso. Estoque dos produtos reabastecido')
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um carrinho com uma autorização inválida', () => {
      cy.sendRequestDeleteCancelCart(`${authorization}z`, 401, 'message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})

describe('Testes do endpoint DELETE /carrinhos/concluir-compra', () => {
  context('Cenários de sucesso', () => {
    it('cadastrar um novo carrinho', () => {
      cy.sendRequestPostCart(authorization, cartBody)
    })

    it('Excluir um carrinho existente', () => {
      cy.sendRequestGetOneProductDataSet(productId)
      cy.sendRequestDeleteFinishCart(authorization, 200, 'message', 'Registro excluído com sucesso')
    })
  })

  context('Cenários de falha', () => {
    it('Tentar excluir um carrinho com uma autorização inválida', () => {
      cy.sendRequestDeleteFinishCart(`${authorization}z`, 401, 'message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })
  })
})
