import UserService from "@/app/services/user.service";
import { NextResponse } from "next/server";

const userService = new UserService();

export async function POST(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const user = await userService.logoutUser(email);
    return NextResponse.json({ payload: user }, { status: 201 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}