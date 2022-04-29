import {useEffect, useState} from "react";
import {onSnapshot, query, collection, orderBy} from "firebase/firestore";
import {SparklesIcon} from "@heroicons/react/outline";
import ReactTextareaAutosize from "react-textarea-autosize";

import {Firebase} from "../../database";
import {IPostData} from "../../interfaces";
import {Post} from "..";

import {Input} from "./";

export const Feed = () => {
  const [post, setPost] = useState<IPostData[]>();

  useEffect(
    () =>
      onSnapshot(
        query(collection(Firebase.db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPost(snapshot.docs);
        },
      ),
    [Firebase.db],
  );

  return (
    <div
      className="text-white flex flex-col flex-grow border-l border-r
		border-gray-700 max-w-[660px]"
    >
      <div
        className="text-[#d9d9d9] sticky flex items-center
      sm:justify-between py-2 px-3 bg-black bg-opacity-90 top-0"
      >
        <h2 className="text-lg sm:text-xl font-bold">Home</h2>
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center
        xl:px-0 ml-auto"
        >
          <SparklesIcon className="h-5 text-white" />
        </div>
      </div>

      <Input />
      <div className="pb-72">
        {post?.map((post) => (
          <Post key={post.id} id={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
};
