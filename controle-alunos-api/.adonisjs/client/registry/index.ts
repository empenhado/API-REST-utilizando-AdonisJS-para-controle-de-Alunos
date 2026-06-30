/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.register': {
    methods: ["POST"],
    pattern: '/register',
    tokens: [{"old":"/register","type":0,"val":"register","end":""}],
    types: placeholder as Registry['auth.register']['types'],
  },
  'auth.login': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.login']['types'],
  },
  'cursos.index': {
    methods: ["GET","HEAD"],
    pattern: '/cursos',
    tokens: [{"old":"/cursos","type":0,"val":"cursos","end":""}],
    types: placeholder as Registry['cursos.index']['types'],
  },
  'cursos.store': {
    methods: ["POST"],
    pattern: '/cursos',
    tokens: [{"old":"/cursos","type":0,"val":"cursos","end":""}],
    types: placeholder as Registry['cursos.store']['types'],
  },
  'cursos.show': {
    methods: ["GET","HEAD"],
    pattern: '/cursos/:id',
    tokens: [{"old":"/cursos/:id","type":0,"val":"cursos","end":""},{"old":"/cursos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cursos.show']['types'],
  },
  'cursos.update': {
    methods: ["PUT"],
    pattern: '/cursos/:id',
    tokens: [{"old":"/cursos/:id","type":0,"val":"cursos","end":""},{"old":"/cursos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cursos.update']['types'],
  },
  'cursos.destroy': {
    methods: ["DELETE"],
    pattern: '/cursos/:id',
    tokens: [{"old":"/cursos/:id","type":0,"val":"cursos","end":""},{"old":"/cursos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['cursos.destroy']['types'],
  },
  'estudantes.index': {
    methods: ["GET","HEAD"],
    pattern: '/estudantes',
    tokens: [{"old":"/estudantes","type":0,"val":"estudantes","end":""}],
    types: placeholder as Registry['estudantes.index']['types'],
  },
  'estudantes.store': {
    methods: ["POST"],
    pattern: '/estudantes',
    tokens: [{"old":"/estudantes","type":0,"val":"estudantes","end":""}],
    types: placeholder as Registry['estudantes.store']['types'],
  },
  'estudantes.aprovados': {
    methods: ["GET","HEAD"],
    pattern: '/estudantes/aprovados',
    tokens: [{"old":"/estudantes/aprovados","type":0,"val":"estudantes","end":""},{"old":"/estudantes/aprovados","type":0,"val":"aprovados","end":""}],
    types: placeholder as Registry['estudantes.aprovados']['types'],
  },
  'estudantes.reprovados': {
    methods: ["GET","HEAD"],
    pattern: '/estudantes/reprovados',
    tokens: [{"old":"/estudantes/reprovados","type":0,"val":"estudantes","end":""},{"old":"/estudantes/reprovados","type":0,"val":"reprovados","end":""}],
    types: placeholder as Registry['estudantes.reprovados']['types'],
  },
  'estudantes.media': {
    methods: ["GET","HEAD"],
    pattern: '/estudantes/:id/media',
    tokens: [{"old":"/estudantes/:id/media","type":0,"val":"estudantes","end":""},{"old":"/estudantes/:id/media","type":1,"val":"id","end":""},{"old":"/estudantes/:id/media","type":0,"val":"media","end":""}],
    types: placeholder as Registry['estudantes.media']['types'],
  },
  'estudantes.show': {
    methods: ["GET","HEAD"],
    pattern: '/estudantes/:id',
    tokens: [{"old":"/estudantes/:id","type":0,"val":"estudantes","end":""},{"old":"/estudantes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['estudantes.show']['types'],
  },
  'estudantes.update': {
    methods: ["PUT"],
    pattern: '/estudantes/:id',
    tokens: [{"old":"/estudantes/:id","type":0,"val":"estudantes","end":""},{"old":"/estudantes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['estudantes.update']['types'],
  },
  'estudantes.destroy': {
    methods: ["DELETE"],
    pattern: '/estudantes/:id',
    tokens: [{"old":"/estudantes/:id","type":0,"val":"estudantes","end":""},{"old":"/estudantes/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['estudantes.destroy']['types'],
  },
  'notas.index': {
    methods: ["GET","HEAD"],
    pattern: '/notas',
    tokens: [{"old":"/notas","type":0,"val":"notas","end":""}],
    types: placeholder as Registry['notas.index']['types'],
  },
  'notas.store': {
    methods: ["POST"],
    pattern: '/notas',
    tokens: [{"old":"/notas","type":0,"val":"notas","end":""}],
    types: placeholder as Registry['notas.store']['types'],
  },
  'notas.show': {
    methods: ["GET","HEAD"],
    pattern: '/notas/:id',
    tokens: [{"old":"/notas/:id","type":0,"val":"notas","end":""},{"old":"/notas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['notas.show']['types'],
  },
  'notas.update': {
    methods: ["PUT"],
    pattern: '/notas/:id',
    tokens: [{"old":"/notas/:id","type":0,"val":"notas","end":""},{"old":"/notas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['notas.update']['types'],
  },
  'notas.destroy': {
    methods: ["DELETE"],
    pattern: '/notas/:id',
    tokens: [{"old":"/notas/:id","type":0,"val":"notas","end":""},{"old":"/notas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['notas.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
