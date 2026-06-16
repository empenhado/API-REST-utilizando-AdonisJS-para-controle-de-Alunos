import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Curso from '#models/curso'
import Nota from '#models/nota'

export default class Estudante extends BaseModel {
  static table = 'estudantes'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nome: string

  @column()
  declare matricula: string

  @column()
  declare cursoId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Curso, {
    foreignKey: 'cursoId',
  })
  declare curso: BelongsTo<typeof Curso>

  @hasMany(() => Nota, {
    foreignKey: 'estudanteId',
  })
  declare notas: HasMany<typeof Nota>
}
