import { getAuthId } from "@/utils/get-auth-info";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  product: f({ image: { maxFileSize: "4MB", maxFileCount: 15 } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  category: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  brand: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  user: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  coupon: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  admin: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),

  seller: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const authId = (await getAuthId()) as string;
      return { userId: authId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;