import { IsLike } from "./Enum";

export interface IComment {
  authorID: string
  text: string
  creationDate: Date | string
  likes: number
  unlikes: number
  isLike: IsLike
}