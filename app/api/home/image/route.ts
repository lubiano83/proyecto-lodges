import HomeService from "@/app/services/home.service";
import AddImageDto from "@/app/dto/home/add-image.dto";

const homeService = new HomeService();

export async function GET() {
    return await homeService.getImage();
};

export async function POST(req: Request) {
    const body = await req.json();
    const addImageDto: AddImageDto = { image: body.image };
    return await homeService.addImage(addImageDto);
}