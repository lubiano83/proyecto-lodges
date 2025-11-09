import { getDataSource } from "../config/mysql.config";
import UserEntity from "../entity/user.entity";

const dataSource = await getDataSource();
const userRepository = dataSource.getRepository(UserEntity);

export default class UserDao {

    getUsers = async() => {
        return await userRepository.find();
    };

    getUserByEmail = async(email: string) => {
        return await userRepository.findOne({ where: { email } });
    }

    createUser = async(data: any) => {
        return userRepository.create(data);
    };

    saveUser = async(user: any) => {
        return userRepository.save(user);
    };

    deleteUser = async(email: string) => {
        return userRepository.delete({ email });
    };
};