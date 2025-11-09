import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    return (await userDao.getUsers()).length;
}