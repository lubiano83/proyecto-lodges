import NewUserDto from "../dto/users/new-user.dto";
import { Role } from "../enum/role.enum";
import UpdateUserDto from "../dto/users/update-user.dto";
import ChangeRoleDto from "../dto/users/change-role.dto";
import LoginUserDto from "../dto/users/login-user.dto";
import UserDao from "../dao/user.dao";
import UserDto from "../dto/users/user.dto";
import { NextRequest, NextResponse } from "next/server";
import { isValidPassword, createHash } from "../utils/bcrypt.utils";
import jwt from "jsonwebtoken";
import JwtInterface from "../interface/jwt.interface";
import { convertToWebp } from "../utils/convertToWebp.utils";
import { uploadUserImage } from "../utils/uploadUserImage.utils";
import ChangePasswordDto from "../dto/users/change-password.dt";
import RecoverPasswordDto from "../dto/users/recover-password.dto";
import generateRandomPassword from "../utils/generateRandomPassword.utils";
import sendPasswordEmail from "../utils/sendPasswordEmail.utils";

const userDao = new UserDao();

export default class UserService {
  getUsers = async (): Promise<NextResponse> => {
    try {
      const users = await userDao.getUsers();
      return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  usersRegistered = async (): Promise<number | NextResponse | undefined> => {
    try {
      const users = (await userDao.getUsers()).length;
      return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  usersLogged = async (): Promise<number | NextResponse | undefined> => {
    try {
      const users = (await userDao.getUsers()).filter(
        (user) => user.is_active === true
      ).length;
      return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  getUserByEmail = async (email: string): Promise<UserDto | NextResponse> => {
    try {
      const user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      if (user.is_active === false)
        return NextResponse.json(
          { message: "Primero debes iniciar sesion.." },
          { status: 401 }
        );
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  addUser = async (newUserDto: NewUserDto): Promise<UserDto | NextResponse> => {
    try {
      if (
        !newUserDto.email ||
        !newUserDto.name ||
        !newUserDto.lastname ||
        !newUserDto.phone ||
        !newUserDto.country ||
        !newUserDto.state ||
        !newUserDto.address ||
        !newUserDto.password
      )
        return NextResponse.json(
          { message: "Todos los campos son requeridos.." },
          { status: 400 }
        );
      const users = await userDao.getUsers();
      const userFounded = users.find((user) => user.email === newUserDto.email);
      if (userFounded)
        return NextResponse.json(
          { message: "Ese email ya esta registrado.." },
          { status: 400 }
        );
      const newUser = await userDao.createUser({
        email: newUserDto.email.toLowerCase().trim(),
        name: newUserDto.name.toLowerCase().trim(),
        lastname: newUserDto.lastname.toLowerCase().trim(),
        phone: newUserDto.phone.trim(),
        country: newUserDto.country.toLowerCase().trim(),
        state: newUserDto.state.toLowerCase().trim(),
        address: newUserDto.address.toLowerCase().trim(),
        password: await createHash(newUserDto.password.trim()),
        image: "",
        role: Role.user,
        is_active: false,
        login_attempts: 0,
        created_at: new Date(),
        updated_at: new Date(),
      });
      await userDao.saveUser(newUser);
      const userDto: UserDto = {
        image: "",
        email: newUserDto.email,
        name: newUserDto.name,
        lastname: newUserDto.lastname,
        phone: newUserDto.phone,
        country: newUserDto.country,
        state: newUserDto.state,
        address: newUserDto.address,
        updated_at: new Date(),
      };
      return NextResponse.json({ payload: userDto }, { status: 201 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  updateUserByEmail = async (
    email: string,
    updateUserDto: UpdateUserDto
  ): Promise<UserDto | NextResponse> => {
    try {
      let user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      user.name = updateUserDto.name
        ? updateUserDto.name.toLowerCase().trim()
        : user.name;
      user.lastname = updateUserDto.lastname
        ? updateUserDto.lastname.toLowerCase().trim()
        : user.lastname;
      user.phone = updateUserDto.phone
        ? updateUserDto.phone.trim()
        : user.phone;
      user.country = updateUserDto.country
        ? updateUserDto.country.toLowerCase().trim()
        : user.country;
      user.state = updateUserDto.state
        ? updateUserDto.state.toLowerCase().trim()
        : user.state;
      user.address = updateUserDto.address
        ? updateUserDto.address.toLowerCase().trim()
        : user.address;
      user.updated_at = new Date();
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  deleteUserByEmail = async (
    email: string
  ): Promise<UserDto | NextResponse> => {
    try {
      const user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      userDao.deleteUser(email.toLowerCase().trim());
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  changeRoleByEmail = async (
    email: string,
    changeRoleDto: ChangeRoleDto
  ): Promise<UserDto | NextResponse> => {
    try {
      let user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      user.role = changeRoleDto.role.toLowerCase().trim() ?? user.role;
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  loginUser = async (
    loginUserDto: LoginUserDto
  ): Promise<UserDto | NextResponse> => {
    try {
      if (!loginUserDto.email || !loginUserDto.password)
        return NextResponse.json(
          { message: "Todos los campos son requeridos.." },
          { status: 400 }
        );
      let user = await userDao.getUserByEmail(
        loginUserDto.email.toLowerCase().trim()
      );
      if (!user)
        return NextResponse.json(
          { message: "Credenciales invalidas.." },
          { status: 401 }
        );
      if (user.login_attempts >= 3)
        return NextResponse.json(
          { message: "Tu cuenta a sido bloqueada, recupera tu contraseña.." },
          { status: 400 }
        );
      const isValid = await isValidPassword(
        loginUserDto.password.trim(),
        user?.password
      );
      if (!isValid) {
        user.login_attempts++;
        await userDao.saveUser(user);
        return NextResponse.json(
          { message: "Credenciales invalidas.." },
          { status: 401 }
        );
      }
      user.is_active = true;
      user.login_attempts = 0;
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      const token = jwt.sign(
        { email: userDto.email, role: user.role },
        process.env.COOKIE_KEY!,
        { expiresIn: "30m" }
      );
      const res = NextResponse.json({ payload: userDto }, { status: 200 });
      res.cookies.set(process.env.COOKIE_NAME!, token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 30,
        path: "/",
      });
      return res;
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  logoutUser = async (email: string): Promise<UserDto | NextResponse> => {
    try {
      let user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      user.is_active = false;
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      const res = NextResponse.json({ payload: userDto }, { status: 200 });
      res.cookies.set(process.env.COOKIE_NAME!, "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 0,
        path: "/",
      });
      return res;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  changeImageByEmail = async (email: string, imageBuffer: Buffer) => {
    try {
      let user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      const imageToWebp = await convertToWebp(imageBuffer);
      if (!imageToWebp)
        return NextResponse.json(
          { message: "Problema para convertir la imagen a webp.." },
          { status: 500 }
        );
      const imageUrl = await uploadUserImage(imageToWebp, user.email);
      if (!imageUrl)
        return NextResponse.json(
          {
            message:
              "Problema para convertir la imagen a string y subirla al servidor",
          },
          { status: 500 }
        );
      user.image = imageUrl;
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: imageUrl,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  changePasswordByEmail = async (
    email: string,
    changePasswordDto: ChangePasswordDto
  ): Promise<UserDto | NextResponse> => {
    try {
      let user = await userDao.getUserByEmail(email.toLowerCase().trim());
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      const isValid = await isValidPassword(
        changePasswordDto.oldPassword.trim(),
        user?.password
      );
      if (
        !isValid ||
        changePasswordDto.newPassword.trim() !==
          changePasswordDto.repeatNewPassword.trim()
      ) {
        user.login_attempts++;
        await userDao.saveUser(user);
        return NextResponse.json({ message: "Las password no coinciden.." });
      }
      user.password = await createHash(changePasswordDto.newPassword.trim());
      await userDao.saveUser(user);
      const userDto: UserDto = {
        image: user.image,
        email: user.email,
        name: user.name,
        lastname: user.lastname,
        phone: user.phone,
        country: user.country,
        state: user.state,
        address: user.address,
        updated_at: user.updated_at,
      };
      return NextResponse.json({ payload: userDto }, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  private getInfoFromCookie(req: NextRequest): JwtInterface | null {
    try {
      const token = req.cookies.get(process.env.COOKIE_NAME!)?.value;
      if (!token) return null;
      const decoded = jwt.verify(
        token,
        process.env.COOKIE_KEY!
      ) as JwtInterface;
      return decoded;
    } catch (error) {
      console.error("Error al obtener datos desde cookie:", error);
      return null;
    }
  }

  checkoutUser = async (req: NextRequest) => {
    try {
      const info = this.getInfoFromCookie(req);
      if (!info) return;
      if (!info.email)
        return NextResponse.json(
          { message: "No hay sesión activa. Usuario inactivo." },
          { status: 401 }
        );
      const user = await userDao.getUserByEmail(info.email);
      if (!user)
        return NextResponse.json(
          { message: "Usuario no encontrado." },
          { status: 404 }
        );
      user.is_active = true;
      await userDao.saveUser(user);
      return NextResponse.json(info, { status: 200 });
    } catch (error) {
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };

  recoverPasswordByEmail = async (
    recoverPasswordDto: RecoverPasswordDto
  ): Promise<NextResponse> => {
    try {
      if (!recoverPasswordDto.email)
        return NextResponse.json(
          { message: "El campo email es requerido.." },
          { status: 400 }
        );
      let user = await userDao.getUserByEmail(
        recoverPasswordDto.email.toLowerCase().trim()
      );
      if (!user)
        return NextResponse.json(
          { message: "Usuaio no encontrado.." },
          { status: 404 }
        );
      const password = generateRandomPassword(8);
      user.password = await createHash(password);
      const passwordSended = sendPasswordEmail(user, password);
      if (!passwordSended)
        return NextResponse.json(
          { message: "Hubo un problema al enviar la contraseña.." },
          { status: 500 }
        );
      await userDao.saveUser(user);
      return NextResponse.json(
        { message: "Tu nueva contraseña ha sido generada y enviada correctamente." },
        { status: 200 }
      );
    } catch (error) {
      console.error("❌ Error en recoverPasswordByEmail:", error);
      return NextResponse.json(
        { message: "Hubo un problema en el backend.." },
        { status: 500 }
      );
    }
  };
}
