'use client'
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useAppDispatch, useAppSelector } from "./redux/hooks";

export default function Home() {
  const userData = useAppSelector((state) => state.UserRedux.value)
  const dispatch = useAppDispatch()
  return (
    <>
      <DefaultLayout>
        <div className="grid grid-rows-2 gapplace-items-center h-100">
          <div className="text-black dark:text-white text-4xl font-semibold">Welcome {userData.username} to GLAMIFY Admin</div>
          <div className="text-black dark:text-white text-2xl font-semibold">Welcome {userData.username} to GLAMIFY Admin</div>
          <span className="loading loading-spinner text-primary w-24 h-24"></span>
        </div>
      </DefaultLayout>
    </>
  );
}
