import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const user = await userDao.getUserByEmail(email);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

export async function DELETE(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const user = await userDao.deleteUserByEmail(email);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}
