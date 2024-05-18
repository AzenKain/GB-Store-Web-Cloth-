'use client'
import Image from "next/image";
import { UserType } from "@/types/user";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { useSession } from "next-auth/react";
import { getAllUserApi, makeRequestApi, updateRoleUserApi } from "@/lib/api";
import { AddListUser, UpdateListUser } from "@/app/redux/features/listUser/listUser.redux";
import { toast } from "react-toastify";
import { updateRoleDto } from "@/lib/dtos/user";


const ClientBox = () => {
  const [itemsShow, setItemsShow] = useState<UserType | null>(null)
  const { data: session } = useSession()
  const userList = useAppSelector((state) => state.ListUser.value)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData: UserType[] = await makeRequestApi(getAllUserApi, null, session?.refresh_token, session?.access_token);

        dispatch(AddListUser(responseData))

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (session?.userId && session?.refresh_token && session?.access_token) {
      fetchData();
    }
  }, [dispatch])

  const handleSubmit = async (role: string[], userId: string) => {
    let dto: updateRoleDto = {
      userId : userId,
      role: role
    }
    const responseData: UserType = await makeRequestApi(updateRoleUserApi, dto, session?.refresh_token, session?.access_token);
    if (responseData) {
      dispatch(UpdateListUser(responseData))
      toast.success("Update role successfully")
      const modal = document.getElementById("my_modal_edit") as HTMLDialogElement | null;
      if (modal) {
        modal.close();
      }
    }
    else {
      toast.error("Update role failed")
    }
  }

  const handleShow = (items: UserType, model: string) => {
    const modal = document.getElementById(model) as HTMLDialogElement | null;
    setItemsShow(items)
    if (modal) {
      modal.showModal();
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Clients List
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">User name</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Age</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Gender</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">City</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Phone number</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Controller</p>
        </div>
      </div>

      {userList?.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={user.imgDisplay ?? ""}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
              <p className="text-sm text-black dark:text-white">
                {user.username}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {new Date(user.birthday ?? "").toDateString()}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {user.gender}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{user.address}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-meta-3">${user.phoneNumber}</p>
          </div>
          <div className="col-span-2 flex items-center gap-1">

            <button aria-label="Submit" onClick={() => handleShow(user, "my_modal_view")} className="btn btn-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

            </button>

            <button aria-label="Submit" onClick={() => handleShow(user, "my_modal_edit")} className="btn btn-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <dialog id="my_modal_view" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{itemsShow?.username}</h3>
          <Image
            src={itemsShow?.imgDisplay ?? ""}
            width={100}
            height={100}
            alt="user"
          />
          <p className="py-1">Email: {itemsShow?.email}</p>
          <div>
            <p className="py-1">First name: {itemsShow?.firstName}</p>
            <p className="py-1">Last name: {itemsShow?.email}</p>
          </div>
          <p className="py-1">Gender: {itemsShow?.gender}</p>
          <p className="pb-1">Birthday: {new Date(itemsShow?.birthday ?? "").toDateString()}</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_edit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-lg btn-circle btn-ghost absolute right-2 top-2 text-3xl">✕</button>
          </form>
          <div className="flex flex-col">
            <h3 className="font-semibold text-3xl">List Roles</h3>
            <div className="form-control w-65">
              <label className="cursor-pointer label">
                <span className="label-text">ADMIN</span>
                <input
                  type="checkbox"
                  className="toggle toggle-success"
                  checked={itemsShow?.role?.includes("ADMIN")}
                />
              </label>
            </div>
            <div className="form-control w-65">
              <label className="cursor-pointer label">
                <span className="label-text">WEREHOUSE MANGER</span>
                <input
                  onChange={e => {
                    setItemsShow(prevItems => {
                      if (prevItems) {
                        const newItems = { ...prevItems };
                        if (e.target.checked) {
                          if (!newItems.role || !newItems.role.includes("WEREHOUSEMANGER")) {
                            newItems.role = [...(newItems.role || []), "WEREHOUSEMANGER"];
                          }
                        } else {
                          newItems.role = (newItems.role || []).filter(role => role !== "WEREHOUSEMANGER");
                        }
                        return newItems;
                      }
                      return null;
                    });
                  }}
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={itemsShow?.role?.includes("WEREHOUSEMANGER")}
                />
              </label>
            </div>
            <div className="form-control w-65">
              <label className="cursor-pointer label">
                <span className="label-text">TELESALES</span>
                <input
                  onChange={e => {
                    setItemsShow(prevItems => {
                      if (prevItems) {
                        const newItems = { ...prevItems };
                        if (e.target.checked) {
                          if (!newItems.role || !newItems.role.includes("TELESALES")) {
                            newItems.role = [...(newItems.role || []), "TELESALES"];
                          }
                        } else {
                          newItems.role = (newItems.role || []).filter(role => role !== "TELESALES");
                        }
                        return newItems;
                      }
                      return null;
                    });
                  }}
                  type="checkbox"
                  className="toggle toggle-secondary"
                  checked={itemsShow?.role?.includes("TELESALES")}
                />
              </label>
            </div>
            <div className="form-control w-65">
              <label className="cursor-pointer label">
                <span className="label-text">BANNED</span>
                <input
                  onChange={e => {
                    setItemsShow(prevItems => {
                      if (prevItems) {
                        const newItems = { ...prevItems };
                        if (e.target.checked) {
                          if (!newItems.role || !newItems.role.includes("BANNED")) {
                            newItems.role = [...(newItems.role || []), "BANNED"];
                          }
                        } else {
                          newItems.role = (newItems.role || []).filter(role => role !== "BANNED");
                        }
                        return newItems;
                      }
                      return null;
                    });
                  }}
                  type="checkbox"
                  className="toggle toggle-error"
                  checked={itemsShow?.role?.includes("BANNED")}
                />
              </label>
            </div>
            <button 
              onClick={async () => await handleSubmit(itemsShow?.role ?? ["USER"], itemsShow?.id ?? "")}
              className="btn btn-success"
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ClientBox;