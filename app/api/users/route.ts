import { NextResponse } from "next/server";
import NewUserDto from "@/app/dto/new-user.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function GET() {
  return await userService.getUsers()
}

export async function POST(req: Request) {
  const body = await req.json();
  const newUserDto: NewUserDto = { email: body.email, name: body.name, lastname: body.lastname, phone: body.phone, country: body.country, state: body.state, address: body.address, password: body.password };
  return await userService.addUser(newUserDto);
}