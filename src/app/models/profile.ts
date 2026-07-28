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
    email: string
    phoneNumber: string
    profilePicture: string
    bucketList: BucketListItem[];
    uid?: string

    constructor(usernameIn: string, emailIn: string, phoneNumberIn: string, profilePictureIn: string, bucketListIn: BucketListItem[], uid?: string,) {

        this.username = usernameIn
        this.email = emailIn
        this.phoneNumber = phoneNumberIn
        this.profilePicture = profilePictureIn
        this.uid = uid
        this.bucketList = bucketListIn;
    }
}