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
  @Column({ type: DataType.UUIDV4 })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING })
  declare name: string

  @Column({ allowNull: false, type: DataType.UUIDV4 })
  declare category_id: string;
  
  @Column({ allowNull: false, type: DataType.STRING })
  declare category_name: string;
  
  @Column({ type: DataType.ARRAY(DataType.STRING) })
  declare participants_username: string[];
  
  @Column({ allowNull: false, type: DataType.DATE })
  declare date: Date;

  @Column({ allowNull: false, type: DataType.NUMBER })
  declare duration_min: number;
}

