import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import   Post                  from 'App/Models/Post'
import { schema }              from '@ioc:Adonis/Core/Validator'

export default class PostsController {
  public async index ({}: HttpContextContract) {
    const posts = await Post.all()
    return posts
  }

  public async store ({request}: HttpContextContract) {
    const data = request.only(['title','description','user_id'])
    const newPostSchema = schema.create({
      title: schema.string(),
      description: schema.string(),
      user_id: schema.number(),
    })
    await request.validate({schema:newPostSchema})
    const post = await Post.create(data)
    return post
  }

  public async show ({params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  public async update ({request,params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    const data = request.only(['title','description'])
    post.merge(data)
    await post.save()
    return post
  }

  public async destroy ({params}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    return post
  }
}
