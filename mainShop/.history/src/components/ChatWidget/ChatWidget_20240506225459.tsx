"use client";
import { ChangeEvent, useEffect, useState } from "react";
import useChatScroll from "@/hooks/useScrollChat"
import { useSession } from "next-auth/react";
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket, io } from 'socket.io-client';
import { RoomchatType } from "@/types/roomchat";
import { MessagesType } from "@/types/product";
import { Backend_URL } from "@/lib/Constants";
import { getRoomchatUserApi, makeRequestApi } from "@/lib/api";
import Image from "next/image";

type MySocket = Socket<DefaultEventsMap, DefaultEventsMap>

export default function ChatWidget() {
    const { data: session } = useSession()

    const intialMesages : MessagesType[]= [
        {
            userId: session?.userId,
            content: "Hi, what is websitebot?",
        },
        {
            userId: "bot",
            content:
                "WebsiteBot is a software application designed to perform automated tasks on websites.",
        },
    ];

    const [dataRoomChat, setDataRoomChat] = useState<RoomchatType>({messages: []})
    const [dataChat, setDataChat] = useState<MessagesType[]>([...intialMesages])
    const [chatBox, setChatBox] = useState<string>("")
    const [socketIo, setSocket] = useState<MySocket | undefined>(undefined);


    useEffect(() => {
        const socket = io(Backend_URL);
        setSocket(socket);
    
        const fetchData = async () => {
          try {
            const responseData: RoomchatType = await makeRequestApi(getRoomchatUserApi, null, session?.refresh_token, session?.access_token);
            setDataRoomChat(responseData);
            setDataChat([ ...intialMesages,...responseData.messages,])
    
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        if (session?.userId && session?.refresh_token && session?.access_token) {
          fetchData();
        }
    
        return () => {
          socket.disconnect();
        };
    
      }, [session]);
    
      useEffect(() => {
    
        socketIo?.emit("join-room", { roomId: dataRoomChat.id });
    
        socketIo?.on('add-message', (msg: any) => {
          console.log(msg);
          setDataChat(pre => [...pre, msg]);
        });
    
      },[socketIo])

    const handleSubmitMessage = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (chatBox == "") return;
        let newMeg: MessagesType = {};
        newMeg.userId = session?.userId
        newMeg.content = chatBox;
        newMeg.roomId = dataRoomChat.id;
        socketIo?.emit("send-message", newMeg);
        setChatBox("");
    };

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageData = reader.result as string;
                let newMeg: MessagesType = {};
                newMeg.userId = session?.userId
                newMeg.urlFile = [imageData]
                newMeg.roomId = dataRoomChat.id;
                socketIo?.emit("send-message", newMeg);
            };
            reader.readAsDataURL(file);
        }
    };

    const refChat: React.MutableRefObject<HTMLDivElement | null> = useChatScroll(dataChat);

    if (session == null) return null;

    return (
        <details className="dropdown dropdown-top dropdown-end">
            <summary className="m-1 btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>

            </summary>
            <div className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box">
                <div className="relative bg-white max-w-[400px]">
                    <p className="p-4 font-medium">Chat with me!</p>
                    <div className="divide-y divide-gray-300/50 border-t w-full border-gray-300/50">
                        <div ref={refChat} className="no-scrollbar w-full overflow-auto space-y-6 py-8 text-base leading-7 text-gray-600 h-[400px] overflow-y-auto">
                            <ul className="space-y-4 w-full px-4">
                                {dataChat.map((item, idx) => (
                                    <li
                                        key={item.id}
                                        className={`flex justify-start ${item.userId === session.userId ? "ml-20 justify-end" : "mr-20"
                                            }`}
                                    >
                                        {item.urlFile?.length > 0 && (
                                            <Image
                                        )}
                                        <p className="bg-gray-100 p-2 rounded-md">{item.content}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <form
                            onSubmit={handleSubmitMessage}
                            className="p-4 flex gap-2 text-base items-center font-semibold leading-7"
                        >
                            <input
                                name="message"
                                value={chatBox}
                                onChange={(e) => setChatBox(e.target.value)}
                                placeholder="Ask any question"
                                className="px-2 py-1.5 border rounded-md font-normal focus:outline-none focus:border-gray-400"
                            />
                            <input placeholder="uploadFile" id="upload-photo" type="file" name="photo" className="z-[-1] opacity-0 absolute w-0 h-0" />
                            <label htmlFor="upload-photo" className="hover:text-primary cursor-pointer justify-self-center w-[24px] h-[24px]">
                                <svg width="18" height="18" viewBox="0 0 18 18" className="fill-current"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.835 1.79102C11.2378 1.79102 10.6651 2.02824 10.2428 2.45051L3.3503 9.34302C2.64657 10.0467 2.25122 11.0012 2.25122 11.9964C2.25122 12.9917 2.64657 13.9461 3.3503 14.6499C4.05403 15.3536 5.0085 15.7489 6.00372 15.7489C6.99895 15.7489 7.95341 15.3536 8.65714 14.6499L15.5496 7.75736C15.8425 7.46446 16.3174 7.46446 16.6103 7.75736C16.9032 8.05025 16.9032 8.52512 16.6103 8.81802L9.7178 15.7105C8.73277 16.6956 7.39677 17.2489 6.00372 17.2489C4.61067 17.2489 3.27468 16.6956 2.28964 15.7105C1.30461 14.7255 0.751221 13.3895 0.751221 11.9964C0.751221 10.6034 1.30461 9.26739 2.28964 8.28236L9.18214 1.38985C9.88572 0.686279 10.84 0.291016 11.835 0.291016C12.83 0.291016 13.7842 0.686279 14.4878 1.38985C15.1914 2.09343 15.5866 3.04768 15.5866 4.04268C15.5866 5.03769 15.1914 5.99194 14.4878 6.69552L7.5878 13.588C7.16569 14.0101 6.59318 14.2473 5.99622 14.2473C5.39926 14.2473 4.82676 14.0101 4.40464 13.588C3.98253 13.1659 3.74539 12.5934 3.74539 11.9964C3.74539 11.3995 3.98253 10.827 4.40464 10.4049L10.7725 4.04454C11.0655 3.75182 11.5404 3.7521 11.8331 4.04517C12.1258 4.33823 12.1256 4.81311 11.8325 5.10583L5.4653 11.4655C5.32469 11.6063 5.24539 11.7974 5.24539 11.9964C5.24539 12.1956 5.32449 12.3865 5.4653 12.5274C5.60611 12.6682 5.79709 12.7473 5.99622 12.7473C6.19535 12.7473 6.38633 12.6682 6.52714 12.5274L13.4271 5.63486C13.8492 5.21261 14.0866 4.63973 14.0866 4.04268C14.0866 3.4455 13.8494 2.87278 13.4271 2.45051C13.0049 2.02824 12.4321 1.79102 11.835 1.79102Z"></path></svg>
                            </label>
                            <button className="bg-gray-600 px-2.5 rounded-md text-white h-[35px] ">
                           
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="22" x2="11" y1="2" y2="13"></line>
                                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </details>
    );
}
