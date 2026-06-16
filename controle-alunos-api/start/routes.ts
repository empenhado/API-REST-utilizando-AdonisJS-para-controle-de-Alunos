/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
// start/routes.ts
import router from '@adonisjs/core/services/router'
import swaggerConfig from '#config/swagger'
import AutoSwagger from 'adonis-autoswagger'
import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'

// Endpoint que gera o arquivo de especificação OpenAPI (YAML)
router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swaggerConfig)
})

// Endpoint que renderiza a interface visual para testes
router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swaggerConfig)

  // Dica: Se preferir uma interface mais moderna que o Swagger clássico,
  // você pode trocar a linha acima por:
  // return AutoSwagger.default.scalar('/swagger')
})

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())
  })
  .prefix('/api/v1')
