import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  BelongsTo,
  ForeignKey,
  Default,
  DataType,
} from 'sequelize-typescript';
import { User } from '../users/model';

@Table
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @ForeignKey(() => User)
  @Column
  public userId: number;

  @BelongsTo(() => User, 'userId')
  public user: User;

  @Default(0)
  @Column(DataType.DECIMAL)
  public value: string;
}
