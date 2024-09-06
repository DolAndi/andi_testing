import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'

const admTrueBodySucess = userPostRequestBody('true')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let productId = ''

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
})

describe('Testes do endpoint GET /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para as consultas', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('Buscar por um produto com ID existente', () => {
      cy.sendRequestGetOneProductSucess(productId, productBodySucess)
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um produto com ID inexistente', () => {
      cy.sendRequestGetOneProductExpectedFailure(`${productId}_123`, 400, 'message', 'Produto não encontrado')
    })
  })
})

describe('Testes do endpoint (Lista) GET /produtos/?{parameter}={value}', () => {
  context('Cenários de sucesso', () => {
    it('Buscar por produtos com o parâmetro ID', () => {
      cy.sendRequestGetListProductSucess('_id', productId)
    })

    it('Buscar por produtos com o parâmetro Nome', () => {
      cy.sendRequestGetListProductSucess('nome', productBodySucess.nome)
    })

    it('Buscar por produtos com o parâmetro Preço', () => {
      cy.sendRequestGetListProductSucess('preco', productBodySucess.preco)
    })

    it('Buscar por produtos com o parâmetro Descrição', () => {
      cy.sendRequestGetListProductSucess('descricao', productBodySucess.descricao)
    })

    it('Buscar por produtos com o parâmetro Quantidade', () => {
      cy.sendRequestGetListProductSucess('quantidade', productBodySucess.quantidade)
    })

    it('Buscar por produtos sem utilizar parâmetros', () => {
      cy.sendRequestGetListProductWithoutParametersSucess()
    })
  })

  context('Cenários de falha', () => {
    it('Buscar por um produto com um parâmetro inexistente', () => {
      cy.sendRequestGetListProductExpectedFailure('?parametroInexistente=123', 400, 'parametroInexistente', 'parametroInexistente não é permitido')
    })
  })
})
