import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function POST(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  return await userService.logoutUser(email);
}

export async function PATCH(
  req: Request,
  { params }: { params: { email: string } }
) {
  const { email } = await params;
  const form = await req.formData();
  const file = form.get("image") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return await userService.changeImageByEmail(email, buffer);
}
