import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/user'

export default class AuthController {
  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerValidator)

    const userExists = await User.findBy('email', data.email)

    if (userExists) {
      return response.status(400).json({
        error: 'Este e-mail já está cadastrado',
      })
    }

    const user = await User.create({
      nome: data.nome,
      email: data.email,
      password: data.password,
    })

    return {
      message: 'Usuário cadastrado com sucesso',
      user,
    }
  }

  async login({ request }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    const token = await User.accessTokens.create(user)

    return {
      message: 'Login realizado com sucesso',
      user,
      token,
    }
  }
}
