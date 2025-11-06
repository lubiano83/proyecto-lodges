import { getDataSource } from "@/app/config/mysql.config";
import NewUserDto from "../dto/new-user.dto";
import { Role } from "../enum/role.enum";
import UserEntity from "../entity/user.entity";
import UpdateUserDto from "../dto/update-user.dto";
import ChangeRoleDto from "../dto/change-role.dto";
import LoginUserDto from "../dto/login-user.dto";

const dataSource = await getDataSource();
const userRepository = dataSource.getRepository(UserEntity);

export default class UserService {

    getUsers = async() => {
        try {
            return await userRepository.find();
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    getUserByEmail = async(email: string) => {
        try {
            const user = userRepository.findOne({ where: { email } });
            if(!user) throw new Error("Usuario no encontrado..")
            return user;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    addUser = async( newUserDto: NewUserDto ) => {
        try {
            const users = await this.getUsers();
            const userFounded = users.find(user => user.email === newUserDto.email);
            if(userFounded) throw new Error("Ese mail ya esta registrado..");
            const newUser = userRepository.create({
                email: newUserDto.email,
                name: newUserDto.name,
                lastname: newUserDto.lastname,
                phone: newUserDto.phone,
                password: newUserDto.password,
                role: Role.user,
                is_active: false,
                login_attempts: 0,
                created_at: new Date(),
                updated_at: new Date()
            });
            await userRepository.save(newUser);
            return newUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    updateUserByEmail = async(email: string, updateUserDto: UpdateUserDto) => {
        try {
            let user = await this.getUserByEmail(email);
            if (!user) return;
            if(user?.name !== undefined) {
                user.name = updateUserDto.name ?? user.name;
            };
            if(user?.lastname !== undefined) {
                user.lastname = updateUserDto.lastname ?? user.lastname;
            };
            if(user?.phone !== undefined) {
                user.phone = updateUserDto.phone ?? user.phone;
            };
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    deleteUserByEmail = async(email: string) => {
        try {
            const user = await this.getUserByEmail(email);
            userRepository.delete({ email });
            return user;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    changeRoleByEmail = async(email: string, changeRoleDto: ChangeRoleDto ) => {
        try {
            let user = await this.getUserByEmail(email);
            if (!user) throw new Error("Usuaio no encontrado..");
            if(user.role !== undefined) {
                user.role = changeRoleDto.role ?? user.role;
            }
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    loginUser = async(loginUserDto: LoginUserDto) => {
        try {
            let user = await this.getUserByEmail(loginUserDto.email);
            if (!user) throw new Error("Usuaio no encontrado..");
            if(user.password !== loginUserDto.password) throw new Error("Contraseña invalida..");
            user.is_active = true;
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    logoutUser = async(email: string) => {
        try {
            let user = await this.getUserByEmail(email);
            if (!user) throw new Error("Usuaio no encontrado..");
            user.is_active = false;
            const updatedUser = await userRepository.save(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

}