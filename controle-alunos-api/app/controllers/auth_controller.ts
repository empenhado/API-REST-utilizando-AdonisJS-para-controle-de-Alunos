import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { registerValidator, loginValidator } from '#validators/user'

export default class AuthController {
  /**
   * @register
   * @summary Cadastra um novo usuário
   * @tag Autenticação
   * @requestBody {"nome": "Bruno Vital", "email": "bruno@exemplo.com", "password": "senha123"}
   * @responseBody 201 - {"message": "Usuário cadastrado com sucesso", "user": {}}
   * @responseBody 400 - {"error": "Este e-mail já está cadastrado"}
   */
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

  /**
   * @login
   * @summary Realiza login e retorna o token de acesso
   * @tag Autenticação
   * @requestBody {"email": "admin@ifma.edu.br", "password": "admin123"}
   * @responseBody 200 - {"message": "Login realizado com sucesso", "user": {}, "token": {}
   * * @responseBody 400 - {"errors": [{"message": "E-mail ou senha inválidos"}]}}
   */
  // 1. Adicionado o 'response' aqui nos parâmetros
  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      // 2. Tenta fazer a verificação e criar o token
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(user)

      return {
        message: 'Login realizado com sucesso',
        user,
        token,
      }
    } catch (error) {
      // 3. Se as credenciais estiverem erradas, cai aqui e retorna em PT-BR
      return response.status(400).json({
        errors: [
          { message: 'E-mail ou senha inválidos' }
        ]
      })
    }
  }
}