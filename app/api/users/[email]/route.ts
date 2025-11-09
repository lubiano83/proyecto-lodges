import UserService from "@/app/services/user.service";
import UpdateUserDto from "@/app/dto/update-user.dto";
import ChangeRoleDto from "@/app/dto/change-role.dto";

const userService = new UserService();

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  return await userService.getUserByEmail(email);
}

export async function DELETE(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  return await userService.deleteUserByEmail(email);
}

export async function PUT(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  const body = await req.json();
  const updateUserDto: UpdateUserDto = { name: body.name, lastname: body.lastname, phone: body.phone, country: body.country, state: body.state, address: body.address };
  return await userService.updateUserByEmail(email, updateUserDto);
}

export async function PATCH(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  const body = await req.json();
  const changeRoleDto: ChangeRoleDto = { role: body?.role };
  return await userService.changeRoleByEmail(email, changeRoleDto);
}
