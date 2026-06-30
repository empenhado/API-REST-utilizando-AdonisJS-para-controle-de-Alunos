import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.store': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'cursos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.index': { paramsTuple?: []; params?: {} }
    'estudantes.store': { paramsTuple?: []; params?: {} }
    'estudantes.aprovados': { paramsTuple?: []; params?: {} }
    'estudantes.reprovados': { paramsTuple?: []; params?: {} }
    'estudantes.media': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.index': { paramsTuple?: []; params?: {} }
    'notas.store': { paramsTuple?: []; params?: {} }
    'notas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.register': { paramsTuple?: []; params?: {} }
    'auth.login': { paramsTuple?: []; params?: {} }
    'cursos.store': { paramsTuple?: []; params?: {} }
    'estudantes.store': { paramsTuple?: []; params?: {} }
    'notas.store': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.index': { paramsTuple?: []; params?: {} }
    'estudantes.aprovados': { paramsTuple?: []; params?: {} }
    'estudantes.reprovados': { paramsTuple?: []; params?: {} }
    'estudantes.media': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.index': { paramsTuple?: []; params?: {} }
    'notas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'cursos.index': { paramsTuple?: []; params?: {} }
    'cursos.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.index': { paramsTuple?: []; params?: {} }
    'estudantes.aprovados': { paramsTuple?: []; params?: {} }
    'estudantes.reprovados': { paramsTuple?: []; params?: {} }
    'estudantes.media': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.index': { paramsTuple?: []; params?: {} }
    'notas.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  PUT: {
    'cursos.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.update': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'cursos.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'estudantes.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'notas.destroy': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}