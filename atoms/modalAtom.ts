import {atom} from "recoil";

export const modalState = atom<boolean>({
  key: "modalState",
  default: false,
});

export const postIdState = atom<string>({
  key: "postIdState",
  default: "",
});
