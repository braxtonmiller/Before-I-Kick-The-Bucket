export class BucketItem {
  id?: string;
  title: string
  description: string
  image: string
  completed: boolean
  uid?: string

  constructor(titleIn: string, descriptionIn: string, imageIn: string, completedIn: boolean, uidIn?: string, idIn?: string) {
    this.title = titleIn
    this.description = descriptionIn
    this.image = imageIn
    this.completed = completedIn
    this.uid = uidIn
    this.id = idIn;
  }
}