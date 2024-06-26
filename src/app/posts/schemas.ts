import { z } from "zod";

export const CreatePostSchema = z.object({
  name: z.string().min(1, { message: "Cannot leave empty" }),
  price: z.number().min(0),
  description: z.string().nullable(),
  userId: z.number(),
  // template: __fieldName__: z.__zodType__(),
});
export const UpdatePostSchema = CreatePostSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeletePostSchema = z.object({
  id: z.number(),
});
