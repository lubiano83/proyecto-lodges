import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  return await userService.logoutUser(email);
}