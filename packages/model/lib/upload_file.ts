import { del, put, PutBlobResult, PutCommandOptions } from "@vercel/blob";

export const uploadFile = async (
  folder: string,
  file: File,
  callback: (blob: PutBlobResult | null) => any,
  options: PutCommandOptions = { access: "public" },
) => {
  if (!file) return callback(null);
  const blob = await put(`${folder}/${file.name}`, file, options);
  try {
    await callback(blob);
  } catch (error) {
    await del(blob.url);
    throw error;
  }
};

export const deleteFile = async (url: string) => {
  await del(url);
};
