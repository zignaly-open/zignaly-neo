import {
  PrimaryKey,
  Column,
  AutoIncrement,
  Unique,
  Model,
  Table,
  Validate,
  DataType,
} from 'sequelize-typescript';
import { TransactionType } from '../../types';

@Table
export class Balance extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Validate({ isLowercase: true })
  @Column
  public walletAddress!: string;

  @Column
  public blockchain: string;

  @Column
  public transactionType: TransactionType;

  @Column
  public note: string;

  @Column(DataType.DECIMAL)
  public amount!: string;

  @Column
  public zhits: number;

  @Column
  public currency: string;
}
