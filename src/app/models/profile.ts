import { BucketListItem } from "./bucket-list-item";

export class Profile {

    /**
     * TODO
     * Update Properties to match firebase!!!!!!
     * 
     * use (ctrl + click) + Rename Symbol to quickly
     * change property names
     */
    username: string
    profileEmail: string
    profilePhoneNumber: string
    profileImageURL: string
    profileBucketListItems: BucketListItem[];
    uid?: string

    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string, profileBucketListItemsIn: BucketListItem[], uid?: string,) {

        this.username = profileUsernameIn
        this.profileEmail = profileEmailIn
        this.profilePhoneNumber = profilePhoneNumberIn
        this.profileImageURL = profileImageURLIn
        this.uid = uid
        this.profileBucketListItems = profileBucketListItemsIn;
    }
}