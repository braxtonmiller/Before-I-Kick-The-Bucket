import { BucketListItem } from "./bucket-list-item";

export class Profile {

    profileUsername: string
    profileEmail: string
    profilePhoneNumber: string
    profileImageURL: string
    profileBucketListItems: BucketListItem[];

    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string, profileBucketListItemsIn: BucketListItem[]) {
        this.profileUsername = profileUsernameIn
        this.profileEmail = profileEmailIn
        this.profilePhoneNumber = profilePhoneNumberIn
        this.profileImageURL = profileImageURLIn
        this.profileBucketListItems = profileBucketListItemsIn;
    }
}