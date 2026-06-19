import type { HttpContext } from '@adonisjs/core/http'
import Nota from '#models/nota'
import { criarNotaValidator, atualizarNotaValidator } from '#validators/nota'

export default class NotasController {
  async index() {
    const notas = await Nota.query().preload('estudante')

    return notas
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(criarNotaValidator)

    const nota = await Nota.create({
      valor: data.valor,
      estudanteId: data.estudante_id,
    })

    return {
      message: 'Nota cadastrada com sucesso',
      nota,
    }
  }

  async show({ params, response }: HttpContext) {
    const nota = await Nota.query()
      .where('id', Number(params.id))
      .preload('estudante')
      .first()

    if (!nota) {
      return response.status(404).json({
        error: 'Nota não encontrada',
      })
    }

    return nota
  }

  async update({ params, request, response }: HttpContext) {
    const nota = await Nota.find(params.id)

    if (!nota) {
      return response.status(404).json({
        error: 'Nota não encontrada',
      })
    }

    const data = await request.validateUsing(atualizarNotaValidator)

    nota.merge({
      valor: data.valor,
      estudanteId: data.estudante_id,
    })

    await nota.save()

    return {
      message: 'Nota atualizada com sucesso',
      nota,
    }
  }

  async destroy({ params, response }: HttpContext) {
    const nota = await Nota.find(params.id)

    if (!nota) {
      return response.status(404).json({
        error: 'Nota não encontrada',
      })
    }

    await nota.delete()

    return response.status(204).send(null)
  }
}
