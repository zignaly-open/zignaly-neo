/* eslint-disable @typescript-eslint/no-unused-vars */
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
  AllowNull,
  Validate,
} from 'sequelize-typescript';
import { strToUnit } from '../../redisService';
import { User } from '../users/model';

const isValidFee = (value: string) => {
  if (!strToUnit(value)) {
    throw new Error('Not a valid fee (probably due to decimal places)');
  }
};

@Table
export class Auction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @AllowNull(false)
  @Column
  public title!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.TEXT)
  public claimSuccess: string;

  @Column(DataType.STRING)
  public website: string;

  @Column(DataType.STRING)
  public discord: string;

  @Column(DataType.STRING)
  public telegram: string;

  @Column(DataType.STRING)
  public twitter: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  public expiresAt!: Date;

  @AllowNull(false)
  @Column(DataType.DATE)
  public maxExpiryDate!: Date;

  @Column(DataType.DATE)
  public maxClaimDate: Date;

  @Default('1')
  @Validate({
    isValidFee,
  })
  @Column(DataType.DECIMAL)
  public bidFee: string;

  @Default('0.01')
  @Validate({
    isValidFee,
  })
  @Column(DataType.DECIMAL)
  public currentBid: string;

  @Default('0.01')
  @Validate({
    isValidFee,
  })
  @Column(DataType.DECIMAL)
  public bidStep: string;

  @Default(10)
  @Column(DataType.INTEGER)
  public numberOfWinners: number;

  @HasMany(() => AuctionBid)
  public bids: AuctionBid[];

  @Column
  public imageUrl: string;

  @Default(() => Date.now())
  @Column
  public startDate: Date;

  @Column
  public announcementDate: Date;

  @Column
  public chain: string;

  @Default(false)
  @Column
  public inRedis: boolean;

  @Default(false)
  @Column
  public isFinalized: boolean;

  @Default(false)
  @Column
  public isExclusiveToKuCoin: boolean;

  @Column
  public privateCode: string;
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

  @Column
  public position: number;

  @Column
  public isWinner: boolean;
}
