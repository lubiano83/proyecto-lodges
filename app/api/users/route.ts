import { NextResponse } from "next/server";
import NewUserDto from "@/app/dto/new-user.dto";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
        const users = await userDao.getUsers();
        return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
        throw new Error("Hubo un error en el backend..");
    }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newUserDto: NewUserDto = { name: body.name, lastname: body.lastname, phone: body.phone, email: body.email, password: body.password };
    const user = await userDao.addUser(newUserDto);
    return NextResponse.json({ payload: user }, { status: 201 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}
