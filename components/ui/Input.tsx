import {ChangeEvent, useRef, useState} from "react";
import {getDownloadURL, ref, uploadString} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";
import {Emoji} from "emoji-mart/dist-es/utils/data";
import {useSession} from "next-auth/react";
import ReactTextareaAutosize from "react-textarea-autosize";

import {Firebase} from "../../database";

export const Input = () => {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef<HTMLInputElement>(null);

  const {data} = useSession();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(Firebase.db, "posts"), {
      id: data?.user?.uid,
      username: data?.user?.name,
      userImg: data?.user?.image,
      tag: data?.user?.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(Firebase.storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(docRef, {image: downloadURL});
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile("");
    setShowEmojis(false);
  };

  const addImageToPost = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (!e.target.files) {
      return;
    }

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent: ProgressEvent<FileReader>) => {
      setSelectedFile(readerEvent.target?.result as string);
    };
  };

  const addEmoji = (e: Emoji) => {
    if (!e.unified) {
      return;
    }

    const sym = e && e.unified.split("-");

    const codesArray = sym.map((el) => "0x" + el);
    const emoji = String.fromCodePoint(Number(...codesArray));

    setInput(input + emoji);
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex basis-24 gap-3 
		 ${loading && "opacity-60"}`}
    >
      <img
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        src={data?.user?.image as string}
      />
      <div className="w-full divide-y divide-gray-700">
        <div className="flex flex-col pb-1">
          {/* <textarea
            className="resize-y overflow-hidden bg-transparent outline-none text-[#d9d9d9] 
						text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            placeholder="What's happening?"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          /> */}

          <ReactTextareaAutosize
            className="resize-none bg-transparent outline-none text-[#d9d9d9] 
						text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
            placeholder="What's happening?"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          {selectedFile && (
            <div className={`${selectedFile && "pb-7"}${input && "gap-2.5"}`}>
              <div
                className="w-8 h-8 bg-[#15181c] hover:bg-[#272c26]
							bg-opacity-70 rounded-full flex justify-center items-center
							cursor-pointer"
                onClick={() => setSelectedFile("")}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                alt=""
                className="rounded-2x1 max-h-80 object-contain"
                src={selectedFile}
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center ">
              <div
                className="icon"
                onClick={() => filePickerRef.current?.click()}
              >
                <PhotographIcon className="h-[22px] text-[#1d9bf0]" />
                <input
                  ref={filePickerRef}
                  hidden
                  type="file"
                  onChange={addImageToPost}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <EmojiHappyIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              <div className="icon">
                <CalendarIcon className="h-[22px] text-[#1d9bf0]" />
              </div>

              {showEmojis && (
                <Picker
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                  onSelect={(e) => addEmoji(e)}
                />
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full
                  px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8]
                  disabled:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default
                  "
              disabled={!input.trim() && !selectedFile}
              onClick={() => sendPost()}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
