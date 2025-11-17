import ChangeRoleDto from "@/app/dto/users/change-role.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function GET() {
  return await userService.getUsers();
}

export async function PATCH(
  req: Request
) {
  const body = await req.json();
  const changeRoleDto: ChangeRoleDto = { email: body.email, role: body.role };
  return await userService.changeRoleByEmail(changeRoleDto);
}
