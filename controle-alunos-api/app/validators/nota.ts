import vine, { SimpleMessagesProvider } from '@vinejs/vine'

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

const notaMessages = new SimpleMessagesProvider({
  'valor.required': 'O valor da nota é obrigatório.',
  'valor.number': 'A nota deve ser um número.',
  'valor.min': 'A nota não pode ser menor que 0.',
  'valor.max': 'A nota não pode ser maior que 10.',
  
  'estudante_id.required': 'O ID do estudante é obrigatório.',
  'estudante_id.number': 'O ID do estudante deve ser um número válido.',
})

criarNotaValidator.messagesProvider = notaMessages
atualizarNotaValidator.messagesProvider = notaMessages