import { NextRequest } from "next/server";
import UserService from "@/app/services/user.service";

const userService = new UserService();

export async function GET(req: NextRequest) {
  return userService.checkoutUser(req);
}