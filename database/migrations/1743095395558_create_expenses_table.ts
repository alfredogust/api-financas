import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('category_id').unsigned().references('id').inTable('categories').notNullable().onDelete('CASCADE')
      table.integer('user_id').unsigned().references('id').inTable('users').notNullable().onDelete('CASCADE')
      table.string('description')
      table.decimal('value')
      table.enum('status', [0, 1]) // 0 = pendente // 1 = pago

      table.timestamp('created_at').defaultTo(this.now())
      table.timestamp('updated_at').defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
