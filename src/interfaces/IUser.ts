export interface IUser {
  uid: string
  email: string
  name: string
  birth?: Date
  photoURL?: string
  phoneNumber?: string
  creationDate: Date | string
  lastLogin?: Date | string
}