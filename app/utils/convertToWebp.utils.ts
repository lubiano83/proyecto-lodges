import sharp from "sharp";

export async function convertToWebp(
  imageBuffer: Buffer,
  quality: number = 80
): Promise<Buffer> {
  return sharp(imageBuffer).webp({ quality }).toBuffer();
}
