import ChangeImageDto from "@/app/dto/change-Image.dto";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  return await userService.logoutUser(email);
}

export async function PATCH(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  const body = await req.json();
  const changeImageDto: ChangeImageDto = { image: body.image };
  return await userService.changeImage(email, changeImageDto);
}