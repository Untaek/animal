export interface IUser {
  uid: string
  email: string
  name: string
  photoURL?: string
  phoneNumber?: string
  birth?: Date | string
  creationDate: Date | string
  lastLogin?: Date | string
}