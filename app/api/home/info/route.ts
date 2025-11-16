import HomeService from "@/app/services/home.service";
import CreateInfoDto from "@/app/dto/home/create-info.dto";
import { title } from "process";

const homeService = new HomeService();

export async function GET() {
    return await homeService.getInfo();
};

export async function POST(req: Request) {
    const body = await req.json();
    const createInfoDto: CreateInfoDto = { title: body.title, subtitle: body.subtitle, texto: body.texto };
    return await homeService.createInfo(createInfoDto);
}