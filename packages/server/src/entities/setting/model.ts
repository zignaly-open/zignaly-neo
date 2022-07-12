import { Table, Column, Model, Unique, PrimaryKey } from 'sequelize-typescript';

@Table
export class Setting extends Model {
  @PrimaryKey
  @Unique
  @Column
  public key!: string;

  @Column
  public value!: string;
}
