import { NextResponse } from "next/server";
import HomeDao from "../dao/home.dao";
import CreateInfoDto from "../dto/home/create-info.dto";
import AddImageDto from "../dto/home/add-image.dto";

const homeDao = new HomeDao();

export default class HomeService {

    getInfo = async(): Promise<NextResponse> => {
        try {
            const info = await homeDao.getInfo();
            if (!info) return NextResponse.json({ message: "Info no encontrada..." }, { status: 404 });
            return NextResponse.json({ payload: info }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    getImage = async(): Promise<NextResponse> => {
        try {
            const images = await homeDao.getImage();
            return NextResponse.json({ payload: images }, { status: 200 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

    createInfo = async(createInfoDto: CreateInfoDto): Promise<NextResponse> => {
        try {
            const info = await homeDao.getFirstInfo();
            if(info) await homeDao.deleteInfo(info.id);
            const newInfo = new CreateInfoDto(
                createInfoDto.title,
                createInfoDto.subtitle,
                createInfoDto.texto
            );
            await homeDao.saveInfo(newInfo);
            return NextResponse.json({ payload: newInfo }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

        addImage = async(addImageDto: AddImageDto): Promise<NextResponse> => {
        try {
            const images = await homeDao.getImage();
            if(images.length >= 5) {
                const image = await homeDao.getFirstImage();
                console.log("primera imagen:", image)
                await homeDao.deleteImage(image.id);
            }
            console.log("imagenes:", images);
            const newImage = new AddImageDto(
                addImageDto.image
            );
            await homeDao.saveImage(newImage);
            return NextResponse.json({ payload: newImage }, { status: 201 });
        } catch (error) {
            return NextResponse.json({ message: "Hubo un problema en el backend.." }, { status: 500 });
        }
    };

};