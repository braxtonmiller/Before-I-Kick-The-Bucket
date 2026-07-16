export class Profile {

    profileUsername: string
    profileEmail: string
    profilePhoneNumber: string
    profileImageURL: string


    constructor(profileUsernameIn: string, profileEmailIn: string, profilePhoneNumberIn: string, profileImageURLIn: string) {
        this.profileUsername = profileUsernameIn
        this.profileEmail = profileEmailIn
        this.profilePhoneNumber = profilePhoneNumberIn
        this.profileImageURL = profileImageURLIn
    }
}