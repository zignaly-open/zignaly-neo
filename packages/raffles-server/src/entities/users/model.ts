import {
  Table,
  Column,
  Model,
  Unique,
  PrimaryKey,
  AutoIncrement,
  Default,
  Validate,
} from 'sequelize-typescript';

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

  @Unique
  @Column
  public username?: string;

  @Unique
  @Column
  public discordName?: string;

  @Column
  public onboardingCompletedAt?: Date;
}

export function generateUserNonce(): number {
  return Math.floor(Math.random() * 1000000);
}
