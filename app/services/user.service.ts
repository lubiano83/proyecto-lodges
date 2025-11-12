import NewUserDto from "../dto/new-user.dto";
import { Role } from "../enum/role.enum";
import UpdateUserDto from "../dto/update-user.dto";
import ChangeRoleDto from "../dto/change-role.dto";
import LoginUserDto from "../dto/login-user.dto";
import UserDao from "../dao/user.dao";
import UserDto from "../dto/user.dto";
import { NextRequest, NextResponse } from "next/server";
import ChangeImageDto from "../dto/change-Image.dto";
import { isValidPassword, createHash } from "../utils/bcrypt.utils";
import jwt from "jsonwebtoken";
import JwtInterface from "../interface/jwt.interface";

const userDao = new UserDao();

export default class UserService {

    getUsers = async(): Promise<NextResponse> => {
        try {
            const users = await userDao.getUsers();
            return NextResponse.json({ payload: users }, { status: 200 });
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
            const token = jwt.sign({ email: userDto.email, role: user.role }, process.env.COOKIE_KEY!, { expiresIn: "30m" });
            const res = NextResponse.json({ payload: userDto }, { status: 200 });
            res.cookies.set(process.env.COOKIE_NAME!, token, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 60 * 30, path: "/" });
            return res;
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
            const res = NextResponse.json({ payload: userDto }, { status: 200 });
            res.cookies.set(process.env.COOKIE_NAME!, "", { httpOnly: true, secure: true, sameSite: "strict", maxAge: 0, path: "/" });
            return res;
        } catch (error) {
            console.log(error)
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

    private getInfoFromCookie(req: NextRequest): JwtInterface | null {
        try {
            const token = req.cookies.get(process.env.COOKIE_NAME!)?.value;
            if (!token) return null;
            const decoded = jwt.verify(token, process.env.COOKIE_KEY!) as JwtInterface;
            return decoded;
        } catch (error) {
            console.error("Error al obtener datos desde cookie:", error);
            return null;
        }
    }

    checkoutUser = async (req: NextRequest) => {
        try {
            const info = this.getInfoFromCookie(req);
            if(!info) return;
            if (!info.email) return NextResponse.json({ message: "No hay sesión activa. Usuario inactivo." }, { status: 401 });
            const user = await userDao.getUserByEmail(info.email);
            if (!user) return NextResponse.json({ message: "Usuario no encontrado." }, { status: 404 });
            user.is_active = true;
            await userDao.saveUser(user);
            return NextResponse.json( info, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." },{ status: 500 });
        }
    };

}