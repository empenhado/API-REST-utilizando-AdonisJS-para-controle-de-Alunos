import type { HttpContext } from '@adonisjs/core/http'
import Curso from '#models/curso'
import { criarCursoValidator, atualizarCursoValidator } from '#validators/curso'

export default class CursosController {
  async index() {
    const cursos = await Curso.all()

    return cursos
  }

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

  async show({ params, response }: HttpContext) {
    const curso = await Curso.find(params.id)

    if (!curso) {
      return response.status(404).json({
        error: 'Curso não encontrado',
      })
    }

    return curso
  }

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
