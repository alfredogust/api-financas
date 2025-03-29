import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { hasOnlyExpressionInitializer } from 'typescript'

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

  // Exibe um usuário
  async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found.' })
    }

    return response.ok(user)
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({ message: 'User not found.' })
    }

    const data = request.only(['name', 'email', 'password', 'salary'])

    if (data.password) {
      data.password = await hash.make(data.password)
    }

    user.merge(data)
    await user.save()

    return response.ok(user)
  }
}