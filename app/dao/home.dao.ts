import { Repository } from "typeorm";
import { getDataSource } from "../config/mysql.config";
import HomeInfoEntity from "../entity/home-info.entity";
import HomeImageEntity from "../entity/home-image.entity";

const dataSource = await getDataSource();

export default class HomeDao {
    private infoRepository: Repository<HomeInfoEntity>;
    private imageRepository: Repository<HomeImageEntity>;

    constructor() {
        this.infoRepository = dataSource.getRepository(HomeInfoEntity);
        this.imageRepository = dataSource.getRepository(HomeImageEntity);
    };

    getInfo = async () => {
        return await this.infoRepository.find();
    };

    getImage = async () => {
        return await this.imageRepository.find();
    };

    getFirstInfo = async() => {
        const info = await this.infoRepository.find();
        return info[0];
    };

    getFirstImage = async() => {
        const image = await this.imageRepository.find();
        return image[0];
    };

    createInfo = async(data: any) => {
        return await this.infoRepository.create(data);
    };

    createImage = async(data: any) => {
        return await this.imageRepository.create(data);
    };
   
    saveInfo = async (data: any) => {
        return this.infoRepository.save(data);
    };

    saveImage = async (data: any) => {
        return this.imageRepository.save(data);
    };

    deleteInfo = async (id: number) => {
        return this.infoRepository.delete({ id });
    };

    deleteImage = async (id: number) => {
        return this.imageRepository.delete({ id });
    };

};