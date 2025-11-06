import { NextResponse } from "next/server";
import LoginUserDto from "@/app/dto/login-user.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const loginUserDto: LoginUserDto = { email: body.email, password: body.password };
    const user = await userService.loginUser(loginUserDto);
    return NextResponse.json({ payload: user }, { status: 201 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}