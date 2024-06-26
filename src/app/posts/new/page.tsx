import { Metadata } from "next";
import { Suspense } from "react";
import { New__ModelName } from "../components/NewPost";

export const metadata: Metadata = {
  title: "New Post",
  description: "Create a new project",
};

export default function Page() {
  return (
    <div>
      <h1>Create New Post</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <New__ModelName />
      </Suspense>
    </div>
  );
}
