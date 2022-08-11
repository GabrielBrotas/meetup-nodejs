import {
  Table,
  Model,
  PrimaryKey,
  Column,
  DataType,
} from "sequelize-typescript";

@Table({
  tableName: "meetings",
  timestamps: false,
})
export class MeetingModel extends Model {
  @PrimaryKey
  @Column
  declare id: string;

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare category_id: string;
  
  @Column({ allowNull: false })
  declare category_name: string;
  
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare participants_username: string[];
  
  @Column({ allowNull: false })
  declare date: Date;

  @Column({ allowNull: false })
  declare duration_min: number;
}

