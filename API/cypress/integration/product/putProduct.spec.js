import '../../requests/productRequest'
import '../../support/dataSet/makeDataSet'
import userPostRequestBody from '../../support/requestBodies/userPostRequestBody'
import productPostRequestBody from '../../support/requestBodies/productPostRequestBody'
import {
  faker
} from '@faker-js/faker'

const admTrueBodySucess = userPostRequestBody('true')
const admFalseBodySucess = userPostRequestBody('false')
const productBodySucess = productPostRequestBody()
let authorization = 'string'
let authorizationNotAdm = 'string'
let productId = ''

before(() => {
  cy.createUserAndLoginDataSet(admTrueBodySucess).then((response) => {
    authorization = response.body.authorization
  })
  cy.createUserAndLoginDataSet(admFalseBodySucess).then((response) => {
    authorizationNotAdm = response.body.authorization
  })
})

describe('Testes do endpoint PUT /produtos/{_id}', () => {
  context('Cenários de sucesso', () => {
    it('Cadastrar um produto para as edições', () => {
      cy.createProductDataSet(authorization, productBodySucess).then((response) => {
        productId = response.body._id
      })
    })

    it('Editar o campo Nome de um produto', () => {
      let newValue = faker.string.uuid()

      cy.helperPutProductConsultOneField(productId, 'nome', productBodySucess.nome).then(() => {
        productBodySucess['nome'] = newValue
      })

      cy.sendRequestPutProductSucess(productId, authorization, productBodySucess)

      cy.helperPutProductConsultOneField(productId, 'nome', newValue)
    })

    it('Editar o campo Preço de um produto', () => {
      let newValue = faker.number.int({
        min: 100,
        max: 1000
      })

      cy.helperPutProductConsultOneField(productId, 'preco', productBodySucess.preco).then(() => {
        productBodySucess['preco'] = newValue
      })

      cy.sendRequestPutProductSucess(productId, authorization, productBodySucess)

      cy.helperPutProductConsultOneField(productId, 'preco', newValue)
    })

    it('Editar o campo Descrição de um produto', () => {
      let newValue = faker.string.uuid()

      cy.helperPutProductConsultOneField(productId, 'descricao', productBodySucess.descricao).then(() => {
        productBodySucess['descricao'] = newValue
      })

      cy.sendRequestPutProductSucess(productId, authorization, productBodySucess)

      cy.helperPutProductConsultOneField(productId, 'descricao', newValue)
    })

    it('Editar o campo Quantidade de um produto', () => {
      let newValue = faker.number.int({
        min: 10,
        max: 100
      })

      cy.helperPutProductConsultOneField(productId, 'quantidade', productBodySucess.quantidade).then(() => {
        productBodySucess['quantidade'] = newValue
      })

      cy.sendRequestPutProductSucess(productId, authorization, productBodySucess)

      cy.helperPutProductConsultOneField(productId, 'quantidade', newValue)
    })

    it('Editar todos os campos de um produto', () => {
      let newValuesJson = {
        nome: faker.string.uuid(),
        preco: faker.number.int({
          min: 100,
          max: 1000
        }),
        descricao: faker.string.uuid(),
        quantidade: faker.number.int({
          min: 10,
          max: 100
        })
      }

      cy.helperPutProductConsultAllFields(productId, productBodySucess).then(() => {
        productBodySucess['nome'] = newValuesJson.nome
        productBodySucess['preco'] = newValuesJson.preco
        productBodySucess['descricao'] = newValuesJson.descricao
        productBodySucess['quantidade'] = newValuesJson.quantidade
      })

      cy.sendRequestPutProductSucess(productId, authorization, productBodySucess)

      cy.helperPutProductConsultAllFields(productId, newValuesJson)
    })
  })

  context('Cenários de falha', () => {
    it('Tentar editar um produto enviando o campo Nome vazio', () => {
      cy.helperPutProductConsultOneField(productId, 'nome', productBodySucess.nome).then(() => {
        productBodySucess['nome'] = ''
      })

      cy.sendRequestPutProductExpectedFailure(productId, authorization, productBodySucess, 400, 'nome', 'nome não pode ficar em branco')
    })

    it('Tentar editar um produto com uma autorização inválida', () => {
      cy.sendRequestPutProductExpectedFailure(productId, `${authorization}z`, productBodySucess, 401, 'message', 'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais')
    })

    it('Tentar editar um produto com a autenticação de um usuário básico', () => {
      cy.sendRequestPutProductExpectedFailure(productId, authorizationNotAdm, productBodySucess, 403, 'message', 'Rota exclusiva para administradores')
    })
  })
})
