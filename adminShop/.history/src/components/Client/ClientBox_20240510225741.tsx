'use client'
import Image from "next/image";
import { UserType } from "@/types/user";
import { useState } from "react";

const userData: UserType[] = [
    {
      imgUrl: ["/images/user/user-01.png"],
      username: "Devid Heilo",
      birthday: new Date(),
      gender: "MALE",
      phoneNumber: "+84232323232",
      address: "Hanoi"
    },
    {
      imgUrl: ["/images/user/user-02.png"],
      username: "Henry Fisher",
      birthday: new Date(),
      gender: "MALE",
      phoneNumber: "+84232323232",
      address: "Hanoi"
    },
    {
      imgUrl: ["/images/user/user-04.png"],
      username: "Jhon Doe",
      birthday: new Date(),
      gender: "MALE",
      phoneNumber: ["+84232323232"],
      address: "Hanoi"
    },
  ];
  
const ClientBox = () => {
  const [itemsShow, setItemsShow] = useState<UserType | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    alert('A name was submitted: ');
    event.preventDefault();
  }

  const handleShow = (items: UserType) => {
    const modal = document.getElementById('my_modal_view') as HTMLDialogElement | null;
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
          <p className="font-medium">User Name</p>
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
          <p className="font-medium">Phone Number</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Controller</p>
        </div>
      </div>

      {userData.map((user, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={user.imgUrl[0]}
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
              {user.birthday?.toDateString()}
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
            <p className="text-sm text-meta-3">${user.phoneNumber[0]}</p>
          </div>
          <div className="col-span-2 flex items-center gap-1">

            <button aria-label="Submit" onClick={() => handleShow(user)} className="btn btn-info">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z" />
              </svg>

            </button>

            <button aria-label="Submit" onClick={() => handleShow(user)} className="btn btn-success">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>

            <button aria-label="Submit" onClick={() => handleShow(user)} className="btn btn-error">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <dialog id="my_modal_view" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{itemsShow?.username}</h3>
          <p className="py-1">Gender: {itemsShow?.gender}</p>
          <p className="pb-1">Date: {itemsShow?.birthday?.toDateString()}</p>
          <Image
            src={itemsShow?.imgUrl[0]}
            width={100}
            height={100}
            alt="user"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_edit" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{itemsShow?.username}</h3>
          <p className="py-1">Gender: {itemsShow?.gender}</p>
          <p className="pb-1">Date: {itemsShow?.birthday?.toDateString()}</p>
          <Image
            src={itemsShow?.imgUrl[0]}
            width={100}
            height={100}
            alt="user"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog id="my_modal_delete" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{itemsShow?.username}</h3>
          <p className="py-1">Gender: {itemsShow?.gender}</p>
          <p className="pb-1">Date: {itemsShow?.birthday?.toDateString()}</p>
          <Image
            src={itemsShow?.imgUrl[0]}
            width={100}
            height={100}
            alt="Product"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ClientBox;