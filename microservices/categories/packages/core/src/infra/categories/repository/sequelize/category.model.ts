import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "categories",
  timestamps: false,
})
export class CategoryModel extends Model {
  @PrimaryKey
  @Column({ type: DataType.STRING })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string
}

