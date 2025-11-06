import { NextResponse } from "next/server";
import NewUserDto from "@/app/dto/new-user.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function GET() {
    try {
        const users = await userService.getUsers()
        return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
        throw new Error("Hubo un error en el backend..");
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUserDto: NewUserDto = { email: body.email, name: body.name, lastname: body.lastname, phone: body.phone, password: body.password };
    const user = await userService.addUser(newUserDto);
    return NextResponse.json({ payload: user }, { status: 201 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

