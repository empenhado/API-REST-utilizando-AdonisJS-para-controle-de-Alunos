import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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

const cursoMessages = new SimpleMessagesProvider({
  'nome.required': 'O nome do curso é obrigatório.',
  'nome.string': 'O nome deve ser um texto válido.',
  
  'descricao.string': 'A descrição deve ser um texto válido.',
})

criarCursoValidator.messagesProvider = cursoMessages
atualizarCursoValidator.messagesProvider = cursoMessages