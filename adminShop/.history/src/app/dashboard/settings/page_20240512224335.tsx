"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useEffect, useState } from "react"
import Datepicker from "tailwind-datepicker-react"
import { toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { editUserDetailApi, getUserDetailApi, makeRequestApi } from "@/lib/api";
import { UserType } from "@/types/user";
import { EditProfileDto } from "@/lib/dtos/user";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { UpdateUser } from "@/app/redux/features/user/user.redux";

const Settings = () => {
  const { data: session } = useSession()
  const userDetail = useAppSelector((state) => state.UserRedux.value)
  const dispatch = useAppDispatch()
  const [show, setShow] = useState<boolean>(false);
  const [genderCheck, setGenderCheck] = useState<boolean[]>([false, false, true]);
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [birthday, setBirthday] = useState<Date | undefined>(new Date());
  const [avatar, setAvatar] = useState<string>('../image/user/user-06.png');

  useEffect(() => {
    const fetchData = async () => {
      let dataUser : UserType = await makeRequestApi(getUserDetailApi, null, session?.refresh_token, session?.access_token)
      dispatch(UpdateUser(dataUser));
      setUsername(dataUser.username ? dataUser.username : "")
      setFirstName(dataUser.firstName ? dataUser.firstName : "")
      setLastName(dataUser.lastName ? dataUser.lastName : "")
      setAddress(dataUser.address ? dataUser.address : "")
      setPhoneNumber(dataUser.phoneNumber ? dataUser.phoneNumber : "")
      setBirthday(dataUser.birthday ? new Date(dataUser.birthday) : new Date())
      setAvatar(dataUser.imgDisplay ? dataUser.imgDisplay : '../image/user/user-06.png')
      if (dataUser.gender === "MALE") {
        setGenderCheck([true, false, false])
      }
      else if (dataUser.gender === "FEMALE") {
        setGenderCheck([false, true, false])
      }
    }
    if (session?.userId && session?.refresh_token && session?.access_token) {
      fetchData();
    }
  },[session])

  const handleGenderBox = (index: number) => {
    setGenderCheck(prevState =>
      prevState.map((checked, i) => (i === index ? true : false))
    );
  };

  const handleChange = (selectedDate: Date) => {
    setBirthday(selectedDate);
  };

  const handleClose = (state: boolean) => {
    setShow(state);
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    let tmpGender = genderCheck[0] ? "MALE" : genderCheck[1] ? "FEMALE" : "OTHER";
    let dto : EditProfileDto = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      birthday: birthday,
      imgDisplay: avatar,
      gender: tmpGender
    }
    let dataUser : UserType = await makeRequestApi(editUserDetailApi, dto, session?.expires, session?.access_token)
    if (dataUser) {
      dispatch(UpdateUser(dataUser))
      toast.success("Update successful!!");
    }
    else {
      toast.error("Update failed!!"); 
    }
  }
  return (
    <DefaultLayout>
      <div className="mx-auto">
        <Breadcrumb pageName="Settings" />

        <div className="grid grid-cols-1 gap-8">
          <div className="col-span-5 xl:col-span-3">


        </div>
      </div>
    </DefaultLayout>
  );
};

export default Settings;
