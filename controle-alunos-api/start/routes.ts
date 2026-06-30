import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '../config/swagger.js'


// Retorna o spec em JSON/YAML
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

// Interface visual (Swagger UI)
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

const AuthController = () => import('#controllers/auth_controller')
const CursosController = () => import('#controllers/cursos_controller')
const EstudantesController = () => import('#controllers/estudantes_controller')
const NotasController = () => import('#controllers/notas_controller')

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.get('/cursos', [CursosController, 'index'])
    router.post('/cursos', [CursosController, 'store'])
    router.get('/cursos/:id', [CursosController, 'show'])
    router.put('/cursos/:id', [CursosController, 'update'])
    router.delete('/cursos/:id', [CursosController, 'destroy'])

    router.get('/estudantes', [EstudantesController, 'index'])
    router.post('/estudantes', [EstudantesController, 'store'])

    router.get('/estudantes/aprovados', [EstudantesController, 'aprovados'])
    router.get('/estudantes/reprovados', [EstudantesController, 'reprovados'])
    router.get('/estudantes/:id/media', [EstudantesController, 'media'])

    router.get('/estudantes/:id', [EstudantesController, 'show'])
    router.put('/estudantes/:id', [EstudantesController, 'update'])
    router.delete('/estudantes/:id', [EstudantesController, 'destroy'])

    router.get('/notas', [NotasController, 'index'])
    router.post('/notas', [NotasController, 'store'])
    router.get('/notas/:id', [NotasController, 'show'])
    router.put('/notas/:id', [NotasController, 'update'])
    router.delete('/notas/:id', [NotasController, 'destroy'])
  })
  .use(middleware.auth())
