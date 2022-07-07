import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { AuctionStatus } from '@zigraffle/shared/types';
import { User } from '../users/model';
import { Transaction } from '../transactions/model';

@Table
export class Auction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Column
  public title!: string;

  @Column
  public description!: string;

  @Column
  public monetaryValue!: string;

  @Column(DataType.STRING)
  public status!: AuctionStatus;

  @Default(() => Date.now() + 7 * 24 * 3600_000)
  @Column(DataType.DATE)
  public expiresAt!: Date;

  @HasMany(() => AuctionBasketItem)
  basketItems: AuctionBasketItem[];

  @Default('1')
  @Column(DataType.DECIMAL)
  public bidFee: string;

  @Default('1')
  @Column(DataType.DECIMAL)
  public startingBid: string;

  @Default('1')
  @Column(DataType.DECIMAL)
  public bidStep: string;

  @Default(10)
  @Column(DataType.INTEGER)
  public numberOfWinners: string;

  @HasMany(() => AuctionBid)
  public bids: AuctionBid[];

  @Column
  public imageUrl: string;
}

@Table
export class AuctionBasketItem extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Column
  public ticker!: string;

  @Column(DataType.DECIMAL)
  public amount!: string;

  @ForeignKey(() => Auction)
  @Column
  public auctionId: number;

  @BelongsTo(() => Auction, 'auctionId')
  public auction: Auction;
}

@Table
export class AuctionBid extends Model {
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

  @ForeignKey(() => Transaction)
  @Column
  public transactionId: number;

  @BelongsTo(() => Transaction, 'auctionId')
  public transaction: Transaction;

  @Default(0)
  @Column(DataType.DECIMAL)
  public value: string;
}
