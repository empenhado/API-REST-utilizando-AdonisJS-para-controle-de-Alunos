import path from 'node:path'
import url from 'node:url'

export default {
  // Configuração para o AdonisJS 7 localizar os models e controllers da raiz
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'API de Controle de Alunos',
  version: '1.0.0',
  description: 'Documentação do sistema de Cursos, Alunos e Notas',
  snakeCase: true,
  tagIndex: 2,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  // Configuração para o Middleware de autenticação
  securitySchemes: {
    BearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  defaultSecurityScheme: 'BearerAuth',
}
