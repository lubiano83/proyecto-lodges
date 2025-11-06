import { NextResponse } from "next/server";
import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const user = await userDao.getUserById(id);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const user = await userDao.deleteUserById(id);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}
