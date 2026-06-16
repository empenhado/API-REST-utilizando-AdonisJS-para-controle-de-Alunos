import vine from '@vinejs/vine'

export const criarNotaValidator = vine.compile(
  vine.object({
    valor: vine.number().min(0).max(10),
    estudante_id: vine.number(),
  })
)

export const atualizarNotaValidator = vine.compile(
  vine.object({
    valor: vine.number().min(0).max(10),
    estudante_id: vine.number(),
  })
)
