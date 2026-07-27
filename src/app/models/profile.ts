import { BucketListItem } from "./bucket-list-item";

export class Profile {

    username: string
    email: string
    phoneNumber: string
    profilePicture: string
    bucketListItems: BucketListItem[];
    uid?: string

    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string, profileBucketListItemsIn: BucketListItem[], uid?: string,) {

        this.username = profileUsernameIn
        this.email = profileEmailIn
        this.phoneNumber = profilePhoneNumberIn
        this.profilePicture = profileImageURLIn
        this.uid = uid
        this.bucketListItems = profileBucketListItemsIn;
    }
}