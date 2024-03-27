import { v2 as cloudinary } from "cloudinary";

const api_secret = process.env.CLOUDINARYSECRET || "";

export function getUrlForImage(image: string) {
  return `https://res.cloudinary.com/${process.env.CLOUDNAME}/image/upload/${image}.jpg`;
}
export async function getSignatureFrom() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    api_secret
  );
  return { timestamp, signature };
}

export async function checkImageCorrect(
  public_id: string,
  version: string,
  signature: string
) {
  const expectedSignature = cloudinary.utils.api_sign_request(
    { public_id: public_id, version: version },
    api_secret
  );
  if (expectedSignature == signature) {
    return true;
  }

  return false;
}
