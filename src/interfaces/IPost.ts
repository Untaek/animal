import { IsLike } from './Enum'

export interface IPost {
  postID : string
  animalID : string
  uploaderID : string
  photoURL: string
  creationDate : Date
  view : number
  text : string
  
  likes: number
  unlikes: number
  isLike : IsLike

  comments: number // count
}
