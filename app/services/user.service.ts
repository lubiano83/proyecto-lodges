import NewUserDto from "../dto/new-user.dto";
import { Role } from "../enum/role.enum";
import UpdateUserDto from "../dto/update-user.dto";
import ChangeRoleDto from "../dto/change-role.dto";
import LoginUserDto from "../dto/login-user.dto";
import UserDao from "../dao/user.dao";

const userDao = new UserDao();

export default class UserService {

    getUsers = async() => {
        try {
            return await userDao.getUsers();
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    getUserByEmail = async(email: string) => {
        try {
            const user = (userDao.getUserByEmail(email));
            if(!user) throw new Error("Usuario no encontrado..");
            return user;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    addUser = async( newUserDto: NewUserDto ) => {
        try {
            const users = await userDao.getUsers();
            const userFounded = users.find(user => user.email === newUserDto.email);
            if(userFounded) throw new Error("Ese mail ya esta registrado..");
            const newUser = await userDao.createUser({
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
            await userDao.saveUser(newUser);
            return newUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    updateUserByEmail = async(email: string, updateUserDto: UpdateUserDto) => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) throw new Error("Usuaio no encontrado..");
            if(user?.name !== undefined) {
                user.name = updateUserDto.name ?? user.name;
            };
            if(user?.lastname !== undefined) {
                user.lastname = updateUserDto.lastname ?? user.lastname;
            };
            if(user?.phone !== undefined) {
                user.phone = updateUserDto.phone ?? user.phone;
            };
            const updatedUser = await userDao.saveUser(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    deleteUserByEmail = async(email: string) => {
        try {
            const user = await userDao.getUserByEmail(email);
            userDao.deleteUser(email);
            return user;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    changeRoleByEmail = async(email: string, changeRoleDto: ChangeRoleDto ) => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) throw new Error("Usuaio no encontrado..");
            if(user.role !== undefined) {
                user.role = changeRoleDto.role ?? user.role;
            }
            const updatedUser = await userDao.saveUser(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    loginUser = async(loginUserDto: LoginUserDto) => {
        try {
            let user = await userDao.getUserByEmail(loginUserDto.email);
            if (!user) throw new Error("Usuaio no encontrado..");
            if(user.password !== loginUserDto.password) throw new Error("Contraseña invalida..");
            user.is_active = true;
            const updatedUser = await userDao.saveUser(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

    logoutUser = async(email: string) => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) throw new Error("Usuaio no encontrado..");
            user.is_active = false;
            const updatedUser = await userDao.saveUser(user);
            return updatedUser;
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("Hubo un error en el backend..");
        }
    };

}