import {
  faker
} from '@faker-js/faker'

const userPostRequestBody = (adm) => {
  const body = {
    nome: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: adm
  }
  return body
}
export default userPostRequestBody
