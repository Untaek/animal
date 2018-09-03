import { ITimeline } from './interfaces/ITimeline'
import { IUser } from './interfaces/IUser'

const animal1 = {
  id: 'a1a1a1',
  photo1: 'https://firebasestorage.googleapis.com/v0/b/animal-f6c09.appspot.com/o/giphy%20(2).gif?alt=media&token=cdbe973a-e714-4157-9f86-fe99c126e368',
  photo2: 'https://firebasestorage.googleapis.com/v0/b/animal-f6c09.appspot.com/o/giphy%20(8).gif?alt=media&token=902c5d57-4373-4d47-a075-d43524b31e6c',
  photo3: 'https://firebasestorage.googleapis.com/v0/b/animal-f6c09.appspot.com/o/giphy%20(10).gif?alt=media&token=4bc2bff6-0738-47cc-be57-ae91860ce004'
}
const animal2 = { id: 'b2b2b2', photo1: '', photo2: '', photo3: '' }
const animal3 = { id: 'c3c3c3', photo1: '', photo2: '', photo3: '' }
const animal4 = { id: 'd4d4d4', photo1: '', photo2: '', photo3: '' }

const uploader1 = { id: 'zzzzzz', photoURL: 'https://' }
const uploader2 = { id: 'xxxxxx', photoURL: 'https://' }
const uploader3 = { id: 'yyyyyy', photoURL: 'https://' }

export const testTimelines: ITimeline[] = [
  {
    id: '1',
    animalID: animal1.id,
    uploaderID: uploader1.id,
    uploaderPhotoURL: uploader1.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 192,
    photoURL: animal1.photo1
  },
  {
    id: '2',
    animalID: animal1.id,
    uploaderID: uploader1.id,
    uploaderPhotoURL: uploader1.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 23,
    photoURL: animal1.photo2
  },
  {
    id: '3',
    animalID: animal1.id,
    uploaderID: uploader1.id,
    uploaderPhotoURL: uploader1.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 2,
    photoURL: animal1.photo3
  },
  {
    id: '4',
    animalID: animal2.id,
    uploaderID: uploader1.id,
    uploaderPhotoURL: uploader1.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 56,
    photoURL: animal2.photo1
  },
  {
    id: '5',
    animalID: animal2.id,
    uploaderID: uploader2.id,
    uploaderPhotoURL: uploader2.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 89,
    photoURL: animal2.photo2
  },
  {
    id: '6',
    animalID: animal3.id,
    uploaderID: uploader3.id,
    uploaderPhotoURL: uploader3.photoURL,
    description: '우리집 강아지의 뛰어 노는 모습입니다~~~',
    likes: 192,
    photoURL: animal3.photo1
  },
]

