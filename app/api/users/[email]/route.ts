import UserService from "@/app/services/user.service";
import UpdateUserDto from "@/app/dto/users/update-user.dto";

const userService = new UserService();

export async function GET(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  return await userService.getUserByEmail(email);
}

export async function PUT(req: Request, { params }: { params: { email: string } }) {
  const { email } = await params;
  const body = await req.json();
  const updateUserDto: UpdateUserDto = { name: body.name, lastname: body.lastname, phone: body.phone, country: body.country, state: body.state, address: body.address };
  return await userService.updateUserByEmail(email, updateUserDto);
}