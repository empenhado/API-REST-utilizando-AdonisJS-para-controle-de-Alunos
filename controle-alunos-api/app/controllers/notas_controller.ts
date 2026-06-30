import type { HttpContext } from '@adonisjs/core/http'
import Nota from '#models/nota'
import { criarNotaValidator, atualizarNotaValidator } from '#validators/nota'

export default class NotasController {
  /**
   * @index
   * @summary Lista todas as notas (com estudante)
   * @tag Notas
   * @responseBody 200 - <Nota[]>
   */
  async index() {
    const notas = await Nota.query().preload('estudante')

    return notas
  }

  /**
   * @store
   * @summary Registra uma nova nota
   * @tag Notas
   * @requestBody {"valor": 8.5, "estudante_id": 1}
   * @responseBody 201 - {"message": "Nota cadastrada com sucesso", "nota": {}}
   */
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

  /**
   * @show
   * @summary Exibe uma nota específica
   * @tag Notas
   * @paramPath id - ID da nota - @type(number) @required
   * @responseBody 200 - <Nota>
   * @responseBody 404 - {"error": "Nota não encontrada"}
   */
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

  /**
   * @update
   * @summary Atualiza uma nota específica
   * @tag Notas
   * @paramPath id - ID da nota - @type(number) @required
   * @requestBody {"valor": 9.0, "estudante_id": 1}
   * @responseBody 200 - {"message": "Nota atualizada com sucesso", "nota": {}}
   * @responseBody 404 - {"error": "Nota não encontrada"}
   */
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

  /**
   * @destroy
   * @summary Remove uma nota
   * @tag Notas
   * @paramPath id - ID da nota - @type(number) @required
   * @responseBody 204 - {}
   * @responseBody 404 - {"error": "Nota não encontrada"}
   */
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