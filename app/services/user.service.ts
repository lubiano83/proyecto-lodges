import NewUserDto from "../dto/new-user.dto";
import { Role } from "../enum/role.enum";
import UpdateUserDto from "../dto/update-user.dto";
import ChangeRoleDto from "../dto/change-role.dto";
import LoginUserDto from "../dto/login-user.dto";
import UserDao from "../dao/user.dao";
import UserDto from "../dto/user.dto";
import { NextResponse } from "next/server";
import ChangeImageDto from "../dto/change-Image.dto";
import { isValidPassword, createHash } from "../utils/bcrypt.utils";

const userDao = new UserDao();

export default class UserService {

    getUsers = async(): Promise<UserDto[] | NextResponse> => {
        try {
            const users = await userDao.getUsers();
            const userDto: UserDto[] = users.map((user) => ({
                image: user.image,
                email: user.email,
                name: user.name,
                lastname: user.lastname,
                phone: user.phone,
                country: user.country,
                state: user.state,
                address: user.address,
                updated_at: user.updated_at
            }));
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    usersRegistered = async(): Promise<number | NextResponse | undefined> => {
        try {
            const users = (await userDao.getUsers()).length;
            return NextResponse.json({ payload: users }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    usersLogged = async(): Promise<number | NextResponse | undefined> => {
        try {
            const users = (await userDao.getUsers()).filter(user => user.is_active === true).length;
            return NextResponse.json({ payload: users }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    getUserByEmail = async(email: string): Promise<UserDto | NextResponse> => {
        try {
            const user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            if(user.is_active === false) return NextResponse.json({ message: "Primero debes iniciar sesion.." }, { status: 401 });
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    addUser = async( newUserDto: NewUserDto ): Promise<UserDto | NextResponse> => {
        try {
            if(!newUserDto.email || !newUserDto.name || !newUserDto.lastname || !newUserDto.phone || !newUserDto.country || !newUserDto.state || !newUserDto.address || !newUserDto.password) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
            const users = await userDao.getUsers();
            const userFounded = users.find(user => user.email === newUserDto.email);
            if(userFounded) return NextResponse.json({ message: "Ese email ya esta registrado.." }, { status: 400 });
            const newUser = await userDao.createUser({
                email: newUserDto.email,
                name: newUserDto.name,
                lastname: newUserDto.lastname,
                phone: newUserDto.phone,
                country: newUserDto.country,
                state: newUserDto.state,
                address: newUserDto.address,
                password: await createHash(newUserDto.password),
                image: "",
                role: Role.user,
                is_active: false,
                login_attempts: 0,
                created_at: new Date(),
                updated_at: new Date()
            });
            await userDao.saveUser(newUser);
            const userDto: UserDto = { image: "", email: newUserDto.email, name: newUserDto.name, lastname: newUserDto.lastname, phone: newUserDto.phone, country: newUserDto.country, state: newUserDto.state, address: newUserDto.address, updated_at: new Date() };
            return NextResponse.json({ payload: userDto }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    updateUserByEmail = async(email: string, updateUserDto: UpdateUserDto): Promise<UserDto | NextResponse> => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            user.name = updateUserDto.name ? updateUserDto.name :  user.name;
            user.lastname = updateUserDto.lastname ? updateUserDto.lastname : user.lastname;
            user.phone = updateUserDto.phone ? updateUserDto.phone : user.phone;
            user.country = updateUserDto.country ? updateUserDto.country : user.country;
            user.state = updateUserDto.state ? updateUserDto.state : user.state;
            user.address = updateUserDto.address ? updateUserDto.address : user.address;
            user.updated_at = new Date();
            await userDao.saveUser(user);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    deleteUserByEmail = async(email: string): Promise<UserDto | NextResponse> => {
        try {
            const user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            userDao.deleteUser(email);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    changeRoleByEmail = async(email: string, changeRoleDto: ChangeRoleDto ): Promise<UserDto | NextResponse> => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            user.role = changeRoleDto.role ?? user.role;
            await userDao.saveUser(user);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    loginUser = async(loginUserDto: LoginUserDto): Promise<UserDto | NextResponse> => {
        try {
            if(!loginUserDto.email || !loginUserDto.password) return NextResponse.json({ message: "Todos los campos son requeridos.." }, { status: 400 });
            let user = await userDao.getUserByEmail(loginUserDto.email);
            if (!user) return NextResponse.json({ message: "Credenciales invalidas.."}, { status: 401 });
            const isValid = await isValidPassword(loginUserDto.password, user?.password);
            if (!isValid) return NextResponse.json({ message: "Credenciales invalidas.."}, { status: 401 });
            user.is_active = true;
            await userDao.saveUser(user);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    logoutUser = async(email: string): Promise<UserDto | NextResponse> => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            user.is_active = false;
            await userDao.saveUser(user);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    changeImage = async(email: string, changeImageDto: ChangeImageDto) => {
        try {
            let user = await userDao.getUserByEmail(email);
            if (!user) return NextResponse.json({ message: "Usuaio no encontrado.." }, { status: 404 });
            user.image = changeImageDto.image ? changeImageDto.image : user.image;
            await userDao.saveUser(user);
            const userDto: UserDto = { image: user.image, email: user.email, name: user.name, lastname: user.lastname, phone: user.phone, country: user.country, state: user.state, address: user.address, updated_at: user.updated_at };
            return NextResponse.json({ payload: userDto }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

}