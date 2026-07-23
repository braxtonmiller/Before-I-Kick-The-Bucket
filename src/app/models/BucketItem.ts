export class BucketItem {
  id: number
  title: string
  description: string
  image: string
  completed: boolean
  uid?: string

  constructor(idIn: number, titleIn: string, descriptionIn: string, imageIn: string, completedIn: boolean, uidIn?: string) {
    this.id = idIn
    this.title = titleIn
    this.description = descriptionIn
    this.image = imageIn
    this.completed = completedIn
    this.uid = uidIn
  }
}