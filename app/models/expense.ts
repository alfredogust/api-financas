import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Category from './category.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'


export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare category_id: number

  @column()
  declare user_id: number

  @column()
  declare description: string

  @column()
  declare value: number

  @column()
  declare status: boolean

  @hasOne(() => Category, {
    foreignKey: 'category_id'
  })
  declare category: HasOne<typeof Category>


  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}