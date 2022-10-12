import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Default,
  Validate,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Code } from '../codes/model';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Unique
  @Column
  public id!: number;

  @Default(generateUserNonce)
  @Column
  public nonce!: number;

  @Unique
  @Validate({ isLowercase: true })
  @Column
  public publicAddress!: string;

  @Column({
    type: DataType.VIRTUAL,
    get(): string {
      const address = this.getDataValue('publicAddress');
      return `${address.slice(0, 6)}..${address.slice(
        address.length - 5,
        address.length - 1,
      )}`;
    },
  })
  public shortAddress: string;

  @Unique
  @Column
  public username?: string;

  @Column
  public email?: string;

  @Column
  public discordName?: string;

  @Column
  public onboardingCompletedAt?: Date;

  @HasMany(() => Code)
  public codes: Code[];

  @Default('metamask')
  @Column
  public walletType: string;
}

export function generateUserNonce(): number {
  return Math.floor(Math.random() * 1000000);
}
