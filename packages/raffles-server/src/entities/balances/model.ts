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

  @Column(DataType.DECIMAL)
  public zhits!: string;

  @Column(DataType.DECIMAL)
  public amount: string;

  @Column
  public currency: string;

  @Column
  public blockchain: string;

  @Column
  public transactionType!: TransactionType;

  @Column
  public note: string;
}

@Table
export class CurrencyToZhit extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Column(DataType.DECIMAL)
  public amount!: string;

  @Unique
  @Column
  public currency!: string;

  @Unique
  @Column
  public symbol!: string;

  @Column(DataType.DECIMAL)
  public zhits!: string;
}
