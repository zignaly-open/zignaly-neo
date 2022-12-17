import {
  PrimaryKey,
  Column,
  AutoIncrement,
  Unique,
  Model,
  Table,
  Validate,
} from 'sequelize-typescript';
import { TransactionType } from '../../types';

@Table
export class Balance extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Unique
  @Validate({ isLowercase: true })
  @Column
  public walletAddress!: string;

  @Column
  public blockchain: string;

  @Column
  public transactionType: TransactionType;

  @Column
  public note: string;

  @Column
  public amount!: number;

  @Column
  public currency: string;

  @Column
  public zhits: number;
}
