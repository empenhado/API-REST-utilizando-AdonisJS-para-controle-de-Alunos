import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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

const estudanteMessages = new SimpleMessagesProvider({
  'nome.required': 'O nome do estudante é obrigatório.',
  'nome.string': 'O nome deve ser um texto válido.',
  
  'matricula.required': 'A matrícula é obrigatória.',
  'matricula.string': 'A matrícula deve ser um texto válido.',
  
  'curso_id.required': 'O ID do curso é obrigatório.',
  'curso_id.number': 'O ID do curso deve ser um número válido.',
})

criarEstudanteValidator.messagesProvider = estudanteMessages
atualizarEstudanteValidator.messagesProvider = estudanteMessages