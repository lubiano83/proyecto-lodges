export default class CreateInfoDto {

    title: string;
    subtitle: string;
    texto: string;

    constructor(
        title: string,
        subtitle: string,
        texto: string
    ) {
        this.title = title;
        this.subtitle = subtitle;
        this.texto = texto;
    }
    
};