function cartBodyFunction(scenario, productId) {
  let product = {}
  let cartBody = {
    produtos: []
  }

  switch (scenario) {
    case 'sucess':
      product = {
        idProduto: productId,
        quantidade: 1
      }
      cartBody.produtos.push(product)
      break
    case 'productDuplicate':
      product = {
        idProduto: productId,
        quantidade: 1
      }
      cartBody.produtos.push(product)
      cartBody.produtos.push(product)
      break
    case 'nonExistentProduct':
      product = {
        idProduto: '01',
        quantidade: 1
      }
      cartBody.produtos.push(product)
      break
    case 'insufficientAmountProduct':
      product = {
        idProduto: productId,
        quantidade: 101
      }
      cartBody.produtos.push(product)
      break
    default:
      break
  }
  return cartBody
}
export default cartBodyFunction
