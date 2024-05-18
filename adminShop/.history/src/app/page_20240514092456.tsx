'use server'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export default async function Home() {

  return (
    <>
      <DefaultLayout>
        <div className="flex items-center justify-center h-screen">
          <div>Welcome to GLAMIFY Admin</div>
          <span className="loading loading-spinner text-primary w-48 h-48"></span>
        </div>
      </DefaultLayout>
    </>
  );
}
