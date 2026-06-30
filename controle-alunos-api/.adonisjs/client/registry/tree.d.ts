/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    register: typeof routes['auth.register']
    login: typeof routes['auth.login']
  }
  cursos: {
    index: typeof routes['cursos.index']
    store: typeof routes['cursos.store']
    show: typeof routes['cursos.show']
    update: typeof routes['cursos.update']
    destroy: typeof routes['cursos.destroy']
  }
  estudantes: {
    index: typeof routes['estudantes.index']
    store: typeof routes['estudantes.store']
    aprovados: typeof routes['estudantes.aprovados']
    reprovados: typeof routes['estudantes.reprovados']
    media: typeof routes['estudantes.media']
    show: typeof routes['estudantes.show']
    update: typeof routes['estudantes.update']
    destroy: typeof routes['estudantes.destroy']
  }
  notas: {
    index: typeof routes['notas.index']
    store: typeof routes['notas.store']
    show: typeof routes['notas.show']
    update: typeof routes['notas.update']
    destroy: typeof routes['notas.destroy']
  }
}
