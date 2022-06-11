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
import { Auction } from '../auctions/model';

export enum TransactionType {
  Deposit = 'deposit',
  Fee = 'bid_fee',
  Bid = 'bid',
}

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

  @ForeignKey(() => Auction)
  @Column
  public auctionId: number;

  @BelongsTo(() => Auction, 'auctionId')
  public auction: Auction;

  @Default(0)
  @Column(DataType.DECIMAL)
  public value: string;

  @Default(0)
  @Column(DataType.INTEGER)
  public block: number;

  @Unique
  @Column(DataType.STRING)
  public txHash: string;

  @Column(DataType.STRING)
  public type!: TransactionType;

  @Column(DataType.BOOLEAN)
  public frozen: boolean;
}
