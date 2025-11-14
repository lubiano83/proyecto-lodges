import { Role } from "../enum/role.enum";
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "USERS" })
export default class UserEntity {
  @PrimaryColumn({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @Column({ type: "varchar", length: 20 })
  lastname: string;

  @Column({ type: "varchar", length: 12 })
  phone: string;

  @Column({ type: "varchar", length: 30 })
  country: string;

  @Column({ type: "varchar", length: 30 })
  state: string;

  @Column({ type: "varchar", length: 100 })
  address: string;

  @Column({ type: "varchar", length: 72 })
  password: string;

  @Column({ type: "text" })
  image: string;

  @Column({ type: "varchar", length: 30 })
  role: string;

  @Column({ type: "bool", default: false })
  is_active: boolean;

  @Column({ type: "int", default: 0 })
  login_attempts: number;

  @Column({ type: "datetime" })
  created_at: Date;

  @Column({ type: "datetime" })
  updated_at: Date;

  constructor(
    name: string,
    lastname: string,
    phone: string,
    country: string,
    state: string,
    address: string,
    email: string,
    password: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.phone = phone;
    this.country = country;
    this.state = state;
    this.address = address;
    this.email = email;
    this.password = password;
    this.image = "";
    this.role = Role.user;
    this.is_active = false;
    this.login_attempts = 0;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
