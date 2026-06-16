import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'notas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()

      table.decimal('valor', 4, 2).notNullable()

      table
        .integer('estudante_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estudantes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
