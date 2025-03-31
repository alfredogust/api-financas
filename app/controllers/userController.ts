import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import UserService from '#services/userService'

export default class UsersController {

  // Listando todos os usuários
  public async index({ response }: HttpContext) {
    try {
      const users = await UserService.getAllUsers()
      return response.ok(users)
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to fetch users.',
        details: error.message || 'Unknown error.',
      })
    }
  }

  // Criando um novo usuário
  public async store({ request, response }: HttpContext) {
    try {
      const data = request.only(['name', 'email', 'password', 'salary'])

      if (!data.name || !data.email || !data.password) {
        return response.badRequest({
          message: 'Name, email and password are required fields.'
        })
      }

      data.password = await hash.make(data.password)

      const user = await User.create(data)
      return response.created(user)
    } catch (error) {
      return response.badRequest({
        message: 'Unable to create user account.',
        details: error.message || 'Unknown error.',
      })
    }
  }

  // Exibe um usuário
  public async show({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        return response.notFound({ message: 'User not found.' })
      }

      return response.ok(user)
    } catch (error) {
      return response.badRequest({
        message: 'Unable to fetch user data.',
        details: error.message || 'Unknown error.',
      })
    }
  }

  // Atualizando os dados do usuário
  public async update({ params, request, response }: HttpContext) {
    try {
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
    } catch (error) {
      return response.badRequest({
        message: 'Unable to update user data.',
        details: error.message || 'Unknown error.',
      })
    }
  }

  // Deletando um usuário
  public async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.find(params.id)

      if (!user) {
        return response.notFound({ message: 'User not found.' })
      }

      await user.delete()
      return response.noContent()
    } catch (error) {
      return response.badRequest({
        message: 'Unable to delete user.',
        details: error.message || 'Unknown error',
      })
    }
  }
}