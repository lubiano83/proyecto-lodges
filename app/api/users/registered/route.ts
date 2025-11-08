import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    try {
        const users = (await userDao.getUsers()).length;
        return NextResponse.json({ payload: users }, { status: 200 });
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
        throw new Error("Hubo un error en el backend..");
    }
}