import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import   User from 'App/Models/User'

export default class UsersController {
  public async index ({}: HttpContextContract) {
    const users = User.query().preload('posts')
    return users
  }

  public async store ({request}: HttpContextContract) {
    const data = request.only(['name'])
    const user = await User.create(data)
    return user
  }

  public async show ({params}: HttpContextContract) {
    const user = await User.query().where('id',params.id).preload('posts')
    return user
  }

  public async update ({params, request}: HttpContextContract) {
    const data = request.only(['name'])
    const user = await User.findOrFail(params.id)
    user.merge(data)
    await user.save()
    return user
  }

  public async destroy ({params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return user
  }
}
