import type { HttpContext } from '@adonisjs/core/http'
import Curso from '#models/curso'
import { criarCursoValidator, atualizarCursoValidator } from '#validators/curso'

export default class CursosController {
  /**
   * @index
   * @summary Lista todos os cursos
   * @tag Cursos
   * @responseBody 200 - <Curso[]>
   */
  async index() {
    const cursos = await Curso.all()

    return cursos
  }

  /**
   * @store
   * @summary Cadastra um novo curso
   * @tag Cursos
   * @requestBody {"nome": "Sistemas para Internet", "descricao": "Curso voltado para desenvolvimento web"}
   * @responseBody 201 - {"message": "Curso cadastrado com sucesso", "curso": {}}
   */
  async store({ request }: HttpContext) {
    const data = await request.validateUsing(criarCursoValidator)

    const curso = await Curso.create({
      nome: data.nome,
      descricao: data.descricao ?? null,
    } as any)

    return {
      message: 'Curso cadastrado com sucesso',
      curso,
    }
  }

  /**
   * @show
   * @summary Exibe um curso específico
   * @tag Cursos
   * @paramPath id - ID do curso - @type(number) @required
   * @responseBody 200 - <Curso>
   * @responseBody 404 - {"error": "Curso não encontrado"}
   */
  async show({ params, response }: HttpContext) {
    const curso = await Curso.find(params.id)

    if (!curso) {
      return response.status(404).json({
        error: 'Curso não encontrado',
      })
    }

    return curso
  }

  /**
   * @update
   * @summary Atualiza um curso específico
   * @tag Cursos
   * @paramPath id - ID do curso - @type(number) @required
   * @requestBody {"nome": "Sistemas para Internet", "descricao": "Descrição atualizada"}
   * @responseBody 200 - {"message": "Curso atualizado com sucesso", "curso": {}}
   * @responseBody 404 - {"error": "Curso não encontrado"}
   */
  async update({ params, request, response }: HttpContext) {
    const curso = await Curso.find(params.id)

    if (!curso) {
      return response.status(404).json({
        error: 'Curso não encontrado',
      })
    }

    const data = await request.validateUsing(atualizarCursoValidator)

    curso.merge({
      nome: data.nome,
      descricao: data.descricao ?? null,
    } as any)

    await curso.save()

    return {
      message: 'Curso atualizado com sucesso',
      curso,
    }
  }

  /**
   * @destroy
   * @summary Remove um curso
   * @tag Cursos
   * @paramPath id - ID do curso - @type(number) @required
   * @responseBody 204 - {}
   * @responseBody 404 - {"error": "Curso não encontrado"}
   */
  async destroy({ params, response }: HttpContext) {
    const curso = await Curso.find(params.id)

    if (!curso) {
      return response.status(404).json({
        error: 'Curso não encontrado',
      })
    }

    await curso.delete()

    return response.noContent()
  }
}