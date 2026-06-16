import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Estudante from '#models/estudante'

export default class Nota extends BaseModel {
  static table = 'notas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare valor: number

  @column()
  declare estudanteId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Estudante, {
    foreignKey: 'estudanteId',
  })
  declare estudante: BelongsTo<typeof Estudante>
}
