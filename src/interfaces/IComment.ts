import { IsLike } from "./Enum";

export interface IComment {
    authorID: string
    text: string
    creationDate: Date
    likes: number
    unlikes: number
    isLike: IsLike
  }