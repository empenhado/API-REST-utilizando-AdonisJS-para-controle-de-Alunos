import vine, { SimpleMessagesProvider } from '@vinejs/vine'

// ==========================================
// Validador de Registro
// ==========================================
export const registerValidator = vine.compile(
  vine.object({
    nome: vine.string().trim(),
    email: vine.string().trim().email(),
    password: vine.string().minLength(6),
  })
)

registerValidator.messagesProvider = new SimpleMessagesProvider({
  'nome.required': 'O campo nome é obrigatório.',
  'nome.string': 'O campo nome deve ser um texto válido.',
  
  'email.required': 'O e-mail é obrigatório.',
  'email.string': 'O e-mail deve ser um texto válido.',
  'email.email': 'Por favor, forneça um endereço de e-mail válido.',
  
  'password.required': 'A senha é obrigatória.',
  'password.string': 'A senha deve ser um texto válido.',
  'password.minLength': 'A senha deve ter pelo menos 6 caracteres.',
})

// ==========================================
// Validador de Login
// ==========================================
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
  })
)

loginValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'O e-mail é obrigatório.',
  'email.string': 'O e-mail deve ser um texto válido.',
  'email.email': 'Por favor, forneça um endereço de e-mail válido.',
  
  'password.required': 'A senha é obrigatória.',
  'password.string': 'A senha deve ser um texto válido.',
})