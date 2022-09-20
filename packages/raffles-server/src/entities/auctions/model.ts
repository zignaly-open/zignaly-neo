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
import { User } from '../users/model';

@Table
export class Auction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Column
  public title!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.TEXT)
  public claimSuccess: string;

  @Column
  public monetaryValue!: string;

  @Column(DataType.STRING)
  public website: string;

  @Column(DataType.STRING)
  public discord: string;

  @Column(DataType.STRING)
  public telegram: string;

  @Column(DataType.STRING)
  public twitter: string;

  @Default(() => Date.now() + 7 * 24 * 3600_000)
  @Column(DataType.DATE)
  public expiresAt!: Date;

  @Default(() => Date.now() + 8 * 24 * 3600_000)
  @Column(DataType.DATE)
  public maxExpiryDate!: Date;

  @Default(() => Date.now() + 10 * 24 * 3600_000)
  @Column(DataType.DATE)
  public maxClaimDate!: Date;

  @HasMany(() => AuctionBasketItem)
  basketItems: AuctionBasketItem[];

  @Default('1')
  @Column(DataType.DECIMAL)
  public bidFee: string;

  @Default('0.01')
  @Column(DataType.DECIMAL)
  public startingBid: string;

  @Default('0.01')
  @Column(DataType.DECIMAL)
  public bidStep: string;

  @Default(10)
  @Column(DataType.INTEGER)
  public numberOfWinners: string;

  @HasMany(() => AuctionBid)
  public bids: AuctionBid[];

  @Column
  public imageUrl: string;

  @Default(() => Date.now())
  @Column
  public startDate: Date;

  @Column
  public chain: string;
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

  @Column
  public claimTransactionId: string;

  @Column
  public transactionId: string;

  @Default(0)
  @Column(DataType.DECIMAL)
  public value: string;
}
