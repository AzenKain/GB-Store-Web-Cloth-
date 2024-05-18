'use server'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
export default async function Home() {

  return (
    <>
      <DefaultLayout>
        <span className="loading loading-spinner text-primary w-48 h-48"></span>
      </DefaultLayout>
    </>
  );
}
