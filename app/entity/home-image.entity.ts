import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "HOME_IMAGES" })
export default class HomeImageEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "text" })
  image!: string;
}