import type { HttpContext } from '@adonisjs/core/http'
import Nota from '#models/nota'
import Estudante from '#models/estudante' 
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
   * @responseBody 404 - {"errors": [{"message": "Estudante não encontrado com o ID fornecido."}]}
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(criarNotaValidator)

    try {
      // 2. Tenta encontrar o estudante antes de salvar a nota
      await Estudante.findOrFail(data.estudante_id)

      const nota = await Nota.create({
        valor: data.valor,
        estudanteId: data.estudante_id,
      })

      return response.status(201).json({
        message: 'Nota cadastrada com sucesso',
        nota,
      })
    } catch (error: any) {
      // Intercepta a falha do findOrFail
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          errors: [{ message: 'Estudante não encontrado com o ID fornecido.' }],
        })
      }

      return response.status(500).json({ message: 'Erro interno no servidor' })
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
   * @responseBody 404 - {"error": "Nota não encontrada ou Estudante não encontrado"}
   */
  async update({ params, request, response }: HttpContext) {
    const nota = await Nota.find(params.id)

    if (!nota) {
      return response.status(404).json({
        error: 'Nota não encontrada',
      })
    }

    const data = await request.validateUsing(atualizarNotaValidator)

    try {
      // 3. Garante que o NOVO estudante_id também exista no banco
      await Estudante.findOrFail(data.estudante_id)

      nota.merge({
        valor: data.valor,
        estudanteId: data.estudante_id,
      })

      await nota.save()

      return {
        message: 'Nota atualizada com sucesso',
        nota,
      }
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          errors: [{ message: 'Estudante não encontrado com o ID fornecido.' }],
        })
      }

      return response.status(500).json({ message: 'Erro interno no servidor' })
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