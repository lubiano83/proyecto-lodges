import { bucket } from "@/app/config/firebase.config";

export async function uploadUserImage(
  fileBuffer: Buffer,
  email: string
): Promise<string | undefined> {
  try {
    const filePath = `users/${email}/profile.webp`;
    const file = bucket.file(filePath);
    await file.delete();
    await file.save(fileBuffer, { contentType: "image/webp", public: true });
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "2100-01-01",
    });
    const versionedUrl = `${url}&v=${Date.now()}`; // 👈 anti caché
    return versionedUrl;
  } catch (error) {
    console.log(error);
  }
}
