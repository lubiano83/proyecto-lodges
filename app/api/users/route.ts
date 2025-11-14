import NewUserDto from "@/app/dto/new-user.dto";
import RecoverPasswordDto from "@/app/dto/recover-password.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(req: Request) {
  const body = await req.json();
  const newUserDto: NewUserDto = { email: body.email, name: body.name, lastname: body.lastname, phone: body.phone, country: body.country, state: body.state, address: body.address, password: body.password };
  return await userService.addUser(newUserDto);
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const recoverPasswordDto: RecoverPasswordDto = { email: body.email };
  return await userService.recoverPasswordByEmail(recoverPasswordDto);
}