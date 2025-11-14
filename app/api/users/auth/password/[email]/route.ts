import ChangePasswordDto from "@/app/dto/users/change-password.dt";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function PATCH(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  const body = await req.json();
  const changePasswordDto: ChangePasswordDto = {
    oldPassword: body.oldPassword,
    newPassword: body.newPassword,
    repeatNewPassword: body.repeatNewPassword,
  };
  return await userService.changePasswordByEmail(email, changePasswordDto);
}
