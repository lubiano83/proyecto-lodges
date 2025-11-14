import ChangeRoleDto from "@/app/dto/users/change-role.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function PATCH(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  const body = await req.json();
  const changeRoleDto: ChangeRoleDto = { role: body?.role };
  return await userService.changeRoleByEmail(email, changeRoleDto);
}

export async function DELETE(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  return await userService.deleteUserByEmail(email);
}
