import type { HttpContext } from '@adonisjs/core/http'
import Estudante from '#models/estudante'
import { criarEstudanteValidator, atualizarEstudanteValidator } from '#validators/estudante'

export default class EstudantesController {
  async index() {
    const estudantes = await Estudante.query().preload('curso').preload('notas')

    return estudantes
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(criarEstudanteValidator)

    const estudanteExists = await Estudante.findBy('matricula', data.matricula)

    if (estudanteExists) {
      return response.status(400).json({
        error: 'Esta matrícula já está cadastrada',
      })
    }

    const estudante = await Estudante.create({
      nome: data.nome,
      matricula: data.matricula,
      cursoId: data.curso_id,
    })

    return {
      message: 'Estudante cadastrado com sucesso',
      estudante,
    }
  }

  async show({ params, response }: HttpContext) {
    const estudante = await Estudante.query()
      .where('id', Number(params.id))
      .preload('curso')
      .preload('notas')
      .first()

    if (!estudante) {
      return response.status(404).json({
        error: 'Estudante não encontrado',
      })
    }

    return estudante
  }

  async update({ params, request, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        error: 'Estudante não encontrado',
      })
    }

    const data = await request.validateUsing(atualizarEstudanteValidator)

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
  }

  async destroy({ params, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        error: 'Estudante não encontrado',
      })
    }

    await estudante.delete()

    return response.status(204).send(null)
  }

  async media({ params, response }: HttpContext) {
    const estudante = await Estudante.find(params.id)

    if (!estudante) {
      return response.status(404).json({
        error: 'Estudante não encontrado',
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
