import vine from '@vinejs/vine'

export const criarEstudanteValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    matricula: vine.string().trim(),
    curso_id: vine.number(),
  })
)

export const atualizarEstudanteValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    matricula: vine.string().trim(),
    curso_id: vine.number(),
  })
)
