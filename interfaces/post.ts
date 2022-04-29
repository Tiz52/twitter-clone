import {DocumentData, QueryDocumentSnapshot} from "firebase/firestore";

export type IPostData = QueryDocumentSnapshot<DocumentData>;

export type IPost = DocumentData;
