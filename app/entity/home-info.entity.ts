import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "HOME_INFO" })
export default class HomeInfoEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 150 })
  title!: string;

  @Column({ type: "varchar", length: 255 })
  subtitle!: string;

  @Column({ type: "text" })
  texto!: string;
}