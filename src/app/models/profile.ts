import { BucketListItem } from "./bucket-list-item";

export class Profile {

    profileUsername: string
    profileEmail: string
    profilePhoneNumber: string
    profileImageURL: string
    profileBucketListItems: BucketListItem[];
    uid?: string

    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string, profileBucketListItemsIn: BucketListItem[], uid?: string,) {

        this.profileUsername = profileUsernameIn
        this.profileEmail = profileEmailIn
        this.profilePhoneNumber = profilePhoneNumberIn
        this.profileImageURL = profileImageURLIn
        this.uid = uid
        this.profileBucketListItems = profileBucketListItemsIn;
    }
}