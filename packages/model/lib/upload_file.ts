import { del, put, PutBlobResult, PutCommandOptions } from "@vercel/blob";

export const UploadFile = async (
  folder: string,
  file: File,
  callback: (blob: PutBlobResult) => any,
  options: PutCommandOptions = { access: "public" },
) => {
  const blob = await put(`${folder}/${file.name}`, file, options);
  try {
    await callback(blob);
  } catch (error) {
    await del(blob.url);
    throw error;
  }
};
