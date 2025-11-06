import { getDataSource } from "@/app/config/mysql.config";
import NewUserDto from "../dto/new-user.dto";
import { randomUUID } from "crypto";
import { Role } from "../enum/role.enum";
import UserEntity from "../entity/user.entity";

const dataSource = await getDataSource();
const userRepository = dataSource.getRepository(UserEntity);

export default class UserDao {

    getUsers = async() => {
        try {
            return userRepository.find();
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };

    getUserById = async(id: string) => {
        try {
            return userRepository.findOne({ where: { id } });
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };

    addUser = async( newUserDto: NewUserDto ) => {
        try {
            const user = userRepository.create({
                id: randomUUID(),
                name: newUserDto.name,
                lastname: newUserDto.lastname,
                phone: newUserDto.phone,
                email: newUserDto.email,
                password: newUserDto.password,
                role: Role.user,
                is_active: false,
                login_attempts: 0,
                created_at: new Date(),
                updated_at: new Date()
            });
            await userRepository.save(user);
            return user;
        } catch (error) {
            console.error("💥 Error en addUser (TypeORM):", error);
            throw error;
        }
    };

    deleteUserById = async(id: string) => {
        try {
            const user = userRepository.findOne({ where: { id } });
            userRepository.delete(id);
            return user;
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };
}