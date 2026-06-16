import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })
)
