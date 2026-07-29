import { BucketListItem } from "./bucket-list-item";

export class Profile {

    id?: string
    profileUsername: string
    profileEmail: string
    profilePhoneNumber: string
    profileImageURL: string
    uid?: string

    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string, uid?: string, id?: string) {

        this.profileUsername = profileUsernameIn
        this.profileEmail = profileEmailIn
        this.profilePhoneNumber = profilePhoneNumberIn
        this.profileImageURL = profileImageURLIn
        this.uid = uid
        this.id = id
    }
}