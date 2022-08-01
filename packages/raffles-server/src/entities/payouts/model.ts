import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/model';
import { Auction } from '../auctions/model';

@Table
export class Payout extends Model {
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
  public publicAddress: string;
}
