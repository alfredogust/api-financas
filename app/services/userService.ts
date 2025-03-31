import User from '../models/user.js'
import hash from '@adonisjs/core/services/hash'

export default class UserService {
  static async getAllUsers() {
    return await User.all()
  }

  static async createUser(data: Partial<any>) {
    data.password = await hash.make(data.password)
    return await User.create(data)
  }

  static async getUserById(id: number) {
    return await User.find(id)
  }

  static async updateUser(id: number, data: Partial<any>) {
    const user = await User.find(id)
    if (!user) return null

    if (data.password) {
      data.password = await hash.make(data.password)
    }

    user.merge(data)
    await user.save()
    return user
  }

  static async deleteUser(id: number) {
    const user = await User.find(id)
    if (!user) return null

    await user.delete()
    return true
  }
}