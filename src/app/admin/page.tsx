import { Metadata } from "next";
import { BlitzPage } from "@blitzjs/auth";
import { useAuthenticatedBlitzContext } from "@/blitz-server";
import { useSession } from "@blitzjs/auth";
import { useRouter } from "next/navigation";
import AdminPage from "./components/AdminPage";

export const metadata: Metadata = {
    title: "Admin Page",
    description: "Admin Page",
};


const Page: BlitzPage = async () => {

    await useAuthenticatedBlitzContext({
        redirectTo: "/",
        role: ["ADMIN"],
    });

    return (
        <AdminPage />
    );
}

export default Page
