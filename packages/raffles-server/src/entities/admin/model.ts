import {
  Table,
  Column,
  Model,
  PrimaryKey,
  BelongsTo,
  Default,
  DataType,
  ForeignKey,
  IsUppercase,
} from 'sequelize-typescript';
import { Code } from '../codes/model';
import { User } from '../users/model';

@Table
export class Admin extends Model {
  @PrimaryKey
  @IsUppercase
  @Column
  public code!: string;

  @ForeignKey(() => User)
  @Column
  public userId?: number;

  @BelongsTo(() => User, 'userId')
  public user: User;

  @Default(false)
  @Column
  public welcomeType: boolean;

  @Column({
    type: DataType.DECIMAL,
  })
  public reqMinimumBalance: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public reqMinimumDeposit: number;

  @Column
  public reqDepositFrom: Date;

  @Column
  public reqMinAuctions: number;

  @Column
  public reqWalletType: string;

  @Column
  public reqAuctionBids: number;

  @Column
  public maxRedemptions: number;

  @Default(0)
  @Column
  public currentRedemptions: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public benefitDirect: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public benefitBalanceFactor: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public benefitDepositFactor: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public maxTotalBenefits: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public rewardDirect: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public rewardFactor: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public rewardDepositFactor: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public maxTotalRewards: number;

  @Column
  public startDate: Date;

  @Column
  public endDate: Date;

  @Default(false)
  @Column
  public isDefault: boolean;
}

@Table
export class CodeRedemption extends Model {
  @ForeignKey(() => Code)
  @Column
  public code: string;

  @BelongsTo(() => Code, 'code')
  public codeInfo!: Code;

  @ForeignKey(() => User)
  @Column
  public invitedId: number;

  @BelongsTo(() => User, 'invitedId')
  public invited!: User;

  @ForeignKey(() => User)
  @Column
  public inviterId: number;

  @BelongsTo(() => User, 'inviterId')
  public inviter!: User;

  @Default(Date.now)
  @Column
  public redemptionDate: Date;

  @Column({
    type: DataType.DECIMAL,
  })
  public invitedBenefit: number;

  @Column({
    type: DataType.DECIMAL,
  })
  public inviterBenefit: number;
}
