export class BucketListItem {

    itemName: string;
    itemDescription: string;
    itemCompletion: boolean;
    itemPhoto: string;

    constructor(nameIn: string, descriptionIn: string, completionIn: boolean, photoIn: string) {
        this.itemName = nameIn;
        this.itemDescription = descriptionIn;
        this.itemCompletion = completionIn;
        this.itemPhoto = photoIn;
    }

}