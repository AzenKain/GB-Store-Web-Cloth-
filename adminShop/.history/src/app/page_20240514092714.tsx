'use server'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export default async function Home() {

  return (
    <>
      <DefaultLayout>
        <div className="grid grid-rows-2 place-items-center h-100">
          <div className="text-black dark:text-white text-2xl">Welcome to GLAMIFY Admin</div>
          <span className="loading loading-spinner text-primary w-24 h-24"></span>
        </div>
      </DefaultLayout>
    </>
  );
}
