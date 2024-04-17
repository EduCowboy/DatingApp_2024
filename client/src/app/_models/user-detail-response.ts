import { Photo } from "./photo-response"

export interface UserDetailResponse {
    id: number
    photoUrl: string
    userName: string
    userAge: number
    knownAs: string
    created: string
    lastActive: string
    gender: string
    introduction: string
    lookingFor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
  }