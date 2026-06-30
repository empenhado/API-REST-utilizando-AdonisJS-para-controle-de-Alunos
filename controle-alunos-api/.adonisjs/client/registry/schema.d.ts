/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.register': {
    methods: ["POST"]
    pattern: '/register'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').registerValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').registerValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['register']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.login': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/auth_controller').default['login']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cursos.index': {
    methods: ["GET","HEAD"]
    pattern: '/cursos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['index']>>>
    }
  }
  'cursos.store': {
    methods: ["POST"]
    pattern: '/cursos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/curso').criarCursoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/curso').criarCursoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cursos.show': {
    methods: ["GET","HEAD"]
    pattern: '/cursos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['show']>>>
    }
  }
  'cursos.update': {
    methods: ["PUT"]
    pattern: '/cursos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/curso').atualizarCursoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/curso').atualizarCursoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'cursos.destroy': {
    methods: ["DELETE"]
    pattern: '/cursos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/cursos_controller').default['destroy']>>>
    }
  }
  'estudantes.index': {
    methods: ["GET","HEAD"]
    pattern: '/estudantes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['index']>>>
    }
  }
  'estudantes.store': {
    methods: ["POST"]
    pattern: '/estudantes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/estudante').criarEstudanteValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/estudante').criarEstudanteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'estudantes.aprovados': {
    methods: ["GET","HEAD"]
    pattern: '/estudantes/aprovados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['aprovados']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['aprovados']>>>
    }
  }
  'estudantes.reprovados': {
    methods: ["GET","HEAD"]
    pattern: '/estudantes/reprovados'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['reprovados']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['reprovados']>>>
    }
  }
  'estudantes.media': {
    methods: ["GET","HEAD"]
    pattern: '/estudantes/:id/media'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['media']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['media']>>>
    }
  }
  'estudantes.show': {
    methods: ["GET","HEAD"]
    pattern: '/estudantes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['show']>>>
    }
  }
  'estudantes.update': {
    methods: ["PUT"]
    pattern: '/estudantes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/estudante').atualizarEstudanteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/estudante').atualizarEstudanteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'estudantes.destroy': {
    methods: ["DELETE"]
    pattern: '/estudantes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/estudantes_controller').default['destroy']>>>
    }
  }
  'notas.index': {
    methods: ["GET","HEAD"]
    pattern: '/notas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['index']>>>
    }
  }
  'notas.store': {
    methods: ["POST"]
    pattern: '/notas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/nota').criarNotaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/nota').criarNotaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'notas.show': {
    methods: ["GET","HEAD"]
    pattern: '/notas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['show']>>>
    }
  }
  'notas.update': {
    methods: ["PUT"]
    pattern: '/notas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/nota').atualizarNotaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/nota').atualizarNotaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['update']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'notas.destroy': {
    methods: ["DELETE"]
    pattern: '/notas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/notas_controller').default['destroy']>>>
    }
  }
}
