import { getDataSource } from "../config/mysql.config";
import UserEntity from "../entity/user.entity";

const dataSource = await getDataSource();
const userRepository = dataSource.getRepository(UserEntity);

export default class UserDao {

    getUsers = async() => {
        try {
            return await userRepository.find();
        } catch (error) {
            throw new Error("Problema con la DB..");
        }
    };

    getUserByEmail = async(email: string) => {
        try {
            return await userRepository.findOne({ where: { email } });
        } catch (error) {
            throw new Error("Problema con la DB..");
        }
    }

    createUser = async(data: any) => {
        try {
            return userRepository.create(data);
        } catch (error) {
            throw new Error("Problema con la DB..");
        }
    };

    saveUser = async(user: any) => {
        try {
            return userRepository.save(user);
        } catch (error) {
            throw new Error("Problema con la DB..");
        }
    };

    deleteUser = async(email: string) => {
        try {
            return userRepository.delete({ email });
        } catch (error) {
            throw new Error("Problema con la DB..");
        }
    };
};