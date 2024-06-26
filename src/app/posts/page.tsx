import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { PostsList } from "./components/PostsList";
import { BlitzPage } from "@blitzjs/auth";
import { useAuthenticatedBlitzContext } from "@/blitz-server";

export const metadata: Metadata = {
  title: "Not FB Marketplace",
  description: "List of posts",
};


const Page: BlitzPage = async () => {

  await useAuthenticatedBlitzContext({
    redirectTo: "/login",
    role: ["USER", "ADMIN"],
    redirectAuthenticatedTo: "/"
  });

  return (
    <div>
      <p>
        <Link href={"/posts/new"}>Create Post</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <PostsList />
      </Suspense>
    </div>
  );
}

// Page.authenticate = { redirectTo: "/login" }

export default Page
