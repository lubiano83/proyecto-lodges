import UserDao from "@/app/dao/user.dao";

const userDao = new UserDao();

export async function GET() {
    return (await userDao.getUsers()).filter(user => user.is_active === true).length;
}