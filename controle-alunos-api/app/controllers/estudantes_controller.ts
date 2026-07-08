import type { HttpContext } from '@adonisjs/core/http'
import Estudante from '#models/estudante'
import Curso from '#models/curso' // Importação adicionada para validar a chave estrangeira
import { criarEstudanteValidator, atualizarEstudanteValidator } from '#validators/estudante'

export default class EstudantesController {
  /**
   * @index
   * @summary Lista todos os estudantes (com curso e notas)
   * @tag Estudantes
   * @responseBody 200 - <Estudante[]>
   */
  async index() {
    const estudantes = await Estudante.query().preload('curso').preload('notas')

    return estudantes
  }

  /**
   * @store
   * @summary Cadastra um novo estudante
   * @tag Estudantes
   * @requestBody {"nome": "Bruno Vital", "matricula": "2024001", "curso_id": 1}
   * @responseBody 201 - {"message": "Estudante cadastrado com sucesso", "estudante": {}}
   * @responseBody 400 - {"errors": [{"message": "Esta matrícula já está cadastrada"}]}
   * @responseBody 404 - {"errors": [{"message": "Curso não encontrado com o ID fornecido."}]}
   */
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(criarEstudanteValidator)

    const estudanteExists = await Estudante.findBy('matricula', data.matricula)

    if (estudanteExists) {
      return response.status(400).json({
        errors: [{ message: 'Esta matrícula já está cadastrada' }],
      })
    }

    try {
      // Valida se o curso existe antes de tentar cadastrar o aluno
      await Curso.findOrFail(data.curso_id)

      const estudante = await Estudante.create({
        nome: data.nome,
        matricula: data.matricula,
        cursoId: data.curso_id,
      })

      return response.status(201).json({
        message: 'Estudante cadastrado com sucesso',
        estudante,
      })
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          errors: [{ message: 'Curso não encontrado com o ID fornecido.' }],
        })
      }
      return response.status(500).json({ message: 'Erro interno no servidor' })
    }
  }

  /**
   * @show
   * @summary Exibe um estudante específico (com curso e notas)
   * @tag Estudantes
   * @paramPath id - ID do estudante - @type(number) @required
   * @responseBody 200 - <Estudante>
   * @responseBody 404 - {"errors": [{"message": "Estudante não encontrado"}]}
   */
  async show({ params, response }: HttpContext) {
    const estudante = await Estudante.query()
      .where('id', Number(params.id))
      .preload('curso')
      .preload('notas')
      .first()

    if (!estudante) {
      return response.status(404).json({
        errors: [{ message: 'Estudante não encontrado' }],
      })
    }

    return estudante
  }

  /**
   * @update
   * @summary Atualiza um estudante específico
   * @tag Estudantes
   * @paramPath id - ID do estudante - @type(number) @required
   * @requestBody {"nome": "Bruno Vital", "matricula": "2024001", "curso_id": 1}
   * @responseBody 200 - {"message": "Estudante atualizado com sucesso", "estudante": {}}
   * @responseBody 404 - {"errors": [{"message": "Estudante ou Curso não encontrado"}]}
   */
  async update({ params, request, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        errors: [{ message: 'Estudante não encontrado' }],
      })
    }

    const data = await request.validateUsing(atualizarEstudanteValidator)

    try {
      // Valida se o novo curso existe
      await Curso.findOrFail(data.curso_id)

      estudante.merge({
        nome: data.nome,
        matricula: data.matricula,
        cursoId: data.curso_id,
      })

      await estudante.save()

      return {
        message: 'Estudante atualizado com sucesso',
        estudante,
      }
    } catch (error: any) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          errors: [{ message: 'Curso não encontrado com o ID fornecido.' }],
        })
      }
      return response.status(500).json({ message: 'Erro interno no servidor' })
    }
  }

  /**
   * @destroy
   * @summary Remove um estudante
   * @tag Estudantes
   * @paramPath id - ID do estudante - @type(number) @required
   * @responseBody 204 - {}
   * @responseBody 404 - {"errors": [{"message": "Estudante não encontrado"}]}
   */
  async destroy({ params, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        errors: [{ message: 'Estudante não encontrado' }],
      })
    }

    await estudante.delete()

    return response.status(204).send(null)
  }

  /**
   * @media
   * @summary Calcula a média das notas de um estudante
   * @tag Estudantes
   * @paramPath id - ID do estudante - @type(number) @required
   * @responseBody 200 - {"estudante": "Bruno Vital", "media": 8.5, "situacao": "Aprovado"}
   * @responseBody 404 - {"errors": [{"message": "Estudante não encontrado"}]}
   */
  async media({ params, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        errors: [{ message: 'Estudante não encontrado' }],
      })
    }

    const notas = await estudante.related('notas').query()

    const total = notas.reduce((soma, nota) => {
      return soma + Number(nota.valor)
    }, 0)

    const media = notas.length > 0 ? total / notas.length : 0

    return {
      estudante: estudante.nome,
      media,
      situacao: media >= 7 ? 'Aprovado' : 'Reprovado',
    }
  }

  // Os métodos aprovados() e reprovados() não precisam de try/catch pois são apenas de leitura e não buscam por IDs específicos.
  async aprovados() {
    const estudantes = await Estudante.query().preload('notas')

    const estudantesAprovados = estudantes.filter((estudante) => {
      const total = estudante.notas.reduce((soma, nota) => {
        return soma + Number(nota.valor)
      }, 0)

      const media = estudante.notas.length > 0 ? total / estudante.notas.length : 0

      return media >= 7
    })

    return estudantesAprovados
  }

  async reprovados() {
    const estudantes = await Estudante.query().preload('notas')

    const estudantesReprovados = estudantes.filter((estudante) => {
      const total = estudante.notas.reduce((soma, nota) => {
        return soma + Number(nota.valor)
      }, 0)

      const media = estudante.notas.length > 0 ? total / estudante.notas.length : 0

      return media < 7
    })

    return estudantesReprovados
  }
}