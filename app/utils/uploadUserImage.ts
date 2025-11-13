import { bucket } from "@/app/config/firebase.config";

export async function uploadUserImage( fileBuffer: Buffer, email: string ): Promise<string> {
  try {
    const filePath = `users/${email}/profile.webp`;
    const file = bucket.file(filePath);
    const imageDeleted = await file.delete();
    console.log("image deleted:", imageDeleted);
    await file.save(fileBuffer, { contentType: "image/webp", public: true });
    const [url] = await file.getSignedUrl({ action: "read", expires: "2100-01-01" })
    return url;
  } catch (error) {
    console.error("❌ Error subiendo imagen a Firebase Storage:", error);
    throw error;
  }
}