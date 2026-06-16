import vine from '@vinejs/vine'

export const criarCursoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    descricao: vine.string().trim().optional(),
  })
)

export const atualizarCursoValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    descricao: vine.string().trim().optional(),
  })
)
