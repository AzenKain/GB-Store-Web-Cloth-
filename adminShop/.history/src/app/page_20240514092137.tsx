'use server'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth"; 
import { redirect } from 'next/navigation'
export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/auth/signin`)
  }
  else {
    redirect(`/dashboard`)
  }

  return (
    <>
      <DefaultLayout>
        <span className="loading loading-spinner text-primary w-"></span>
      </DefaultLayout>
    </>
  );
}
