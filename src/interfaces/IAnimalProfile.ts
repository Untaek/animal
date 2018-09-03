import { IsLike } from './Enum'

export interface IAnimal {
    animalId: string
    name: string
    photoURL?: string
    profile?: IAnimalProfile
}

export interface IAnimalProfile {
    comments: number
    likes: number
    posts: number
    follows: number
    creationDate: Date
    lastUpdate: Date
    text?: string
    birth?: Date
    city?: string
    species?: string
    isLike: IsLike
}