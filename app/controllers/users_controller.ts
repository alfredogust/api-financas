import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {

  // Listando todos os usuários
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.ok(users)
  }

  // Criando um novo usuário
  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'email', 'password', 'salary'])

    data.password = await hash.make(data.password)

    const user = await User.create(data)
    return response.created(user)
  }
}