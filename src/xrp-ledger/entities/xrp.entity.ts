import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"xrp-wallet"})
export class XrpWalletEntity {
@PrimaryGeneratedColumn("uuid")
  id:string

  @Column()
  address:string

  @Column()
  classic_address:string

  @Column()
  publicKey:string

  @Column()
  privateKey:string

  @Column()
  seed:string

  @CreateDateColumn({type:"timestamptz"})
  createdAt:Date
}