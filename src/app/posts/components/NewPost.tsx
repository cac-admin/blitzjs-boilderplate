"use client";
import { FORM_ERROR, PostForm } from "./PostForm";
import { CreatePostSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createPost from "../mutations/createPost";
import { useRouter } from "next/navigation";
import { useSession } from "@blitzjs/auth";

export function New__ModelName() {
  const [createPostMutation] = useMutation(createPost);
  const router = useRouter();
  const session = useSession();
  return (
    <PostForm
      submitText="Create Post"
      schema={CreatePostSchema}
      initialValues={{name: '', price: 0, description: '', userId: (session.userId ? session.userId : 0)}}
      onSubmit={async (values) => {
        try {
          console.log(values)
          const post = await createPostMutation(values);
          router.push(`/posts/${post.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}
