import { Repository } from "typeorm";
import { getDataSource } from "../config/mysql.config";
import UserEntity from "../entity/user.entity";

const dataSource = await getDataSource();

export default class UserDao {
  private userRepository: Repository<UserEntity>;

  constructor() {
    this.userRepository = dataSource.getRepository(UserEntity);
  };

  getUsers = async () => {
    return await this.userRepository.find();
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ where: { email } });
  };

  createUser = async (data: any) => {
    return this.userRepository.create(data);
  };

  saveUser = async (data: any) => {
    return this.userRepository.save(data);
  };

  deleteUser = async (email: string) => {
    return this.userRepository.delete({ email });
  };
}
