import { getDataSource } from "@/app/config/mysql.config";
import NewUserDto from "../dto/new-user.dto";
import { randomUUID } from "crypto";
import { Role } from "../enum/role.enum";
import UserEntity from "../entity/user.entity";
import UserDto from "../dto/user.dto";

const dataSource = await getDataSource();
const userRepository = dataSource.getRepository(UserEntity);

export default class UserDao {

    getUsers = async(): Promise<UserDto[]> => {
        try {
            const users = await userRepository.find();
            const cleanUsers: UserDto[] = users.map(({ id, password, role, login_attempts, is_active, created_at, ...rest }) => rest);
            return cleanUsers;
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };

    getUserByEmail = async(email: string) => {
        try {
            return userRepository.findOne({ where: { email } });
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };

    addUser = async( newUserDto: NewUserDto ): Promise<UserDto> => {
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
            const cleanUser: UserDto = { name: user.name, lastname: user.lastname, phone: user.phone, email: user.email, updated_at: user.updated_at };
            return cleanUser;
        } catch (error) {
            console.error("💥 Error en addUser (TypeORM):", error);
            throw error;
        }
    };

    deleteUserByEmail = async(email: string) => {
        try {
            const user = userRepository.findOne({ where: { email } });
            userRepository.delete(email);
            return user;
        } catch (error) {
            console.error("💥 Error en addUser (MySQL):", error);
            throw error;
        }
    };
}