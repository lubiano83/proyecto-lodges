import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function GET() {
  return await userService.usersRegistered();
}
