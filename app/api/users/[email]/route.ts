import { NextResponse } from "next/server";
import UserService from "@/app/services/user.service";
import UpdateUserDto from "@/app/dto/update-user.dto";
import ChangeRoleDto from "@/app/dto/change-role.dto";

const userService = new UserService();

export async function GET(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const user = await userService.getUserByEmail(email);
    const userActive = user?.is_active === true ? user : {};
    return NextResponse.json({ payload: userActive }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

export async function DELETE(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const user = await userService.deleteUserByEmail(email);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

export async function PUT(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const body = await req.json();
    const updateUserDto: UpdateUserDto = { name: body.name, lastname: body.lastname, phone: body.phone };
    const user = await userService.updateUserByEmail(email, updateUserDto);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}

export async function PATCH(req: Request, { params }: { params: { email: string } }) {
  try {
    const { email } = await params;
    const body = await req.json();
    const changeRoleDto: ChangeRoleDto = { role: body?.role };
    const user = await userService.changeRoleByEmail(email, changeRoleDto);
    return NextResponse.json({ payload: user }, { status: 200 });
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
    throw new Error("Hubo un error en el backend..");
  }
}
