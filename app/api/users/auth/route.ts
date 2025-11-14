import LoginUserDto from "@/app/dto/users/login-user.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(req: Request) {
  const body = await req.json();
  const loginUserDto: LoginUserDto = { email: body.email, password: body.password };
  return await userService.loginUser(loginUserDto);
}