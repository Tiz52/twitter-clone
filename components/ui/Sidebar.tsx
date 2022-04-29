import Image from "next/image";
import {HomeIcon} from "@heroicons/react/solid";
import {
  BellIcon,
  BookmarkAltIcon,
  ClipboardListIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
  HashtagIcon,
  InboxIcon,
  UserIcon,
} from "@heroicons/react/outline";
import {signOut, useSession} from "next-auth/react";

import {SidebarLink} from "./";

export const Sidebar = () => {
  const {data} = useSession();

  return (
    <div className="w-[88px] xl:w-[275px]">
      <div className="flex fixed h-full">
        <div className="flex flex-col lg:w-full items-center justify-between px-3 pb-3">
          <div>
            <div className="flex items-center justify-center w-14 h-14 hoverAnimation p-0">
              <Image height={30} src="https://rb.gy/ogau5a" width={30} />
            </div>
            <div className="flex items-center xl:items-start flex-col gap-2.5 mt-4 mb-2.5">
              <SidebarLink active Icon={HomeIcon} text="Home" />
              <SidebarLink Icon={HashtagIcon} text="Explore" />
              <SidebarLink Icon={BellIcon} text="Notifications" />
              <SidebarLink Icon={InboxIcon} text="Messages" />
              <SidebarLink Icon={BookmarkAltIcon} text="Bookmarks" />
              <SidebarLink Icon={ClipboardListIcon} text="Lists" />
              <SidebarLink Icon={UserIcon} text="Profile" />
              <SidebarLink Icon={DotsCircleHorizontalIcon} text="More" />
            </div>
            <button
              className="hidden xl:inline bg-[#1d9bf0]
            text-white rounded-full w-56 h-[52px] text-lg font-bold shadow-md
            hover:bg-[#1a8cd8]"
            >
              Tweet
            </button>
          </div>
          <div
            className="text-[#d9d9d9] flex justify-start items-center h-16 py-3 hoverAnimation px-2 xl:px-3 gap-3"
            onClick={() => signOut()}
          >
            <img
              alt="user"
              className="h-10 w-10 rounded-full object-cover"
              src={data?.user?.image as string}
            />
            <div className="hidden xl:flex xl:flex-col leading-5">
              <h4 className="font-bold">{data?.user?.name}</h4>
              <p className="text-[#6e767d]">{data?.user?.tag}</p>
            </div>
            <div className="flex flex-auto justify-end">
              <DotsHorizontalIcon className="h-4 hidden xl:inline" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
