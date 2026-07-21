export class BucketItem {
  id: number
  title: string
  description: string
  image: string
  completed: boolean

  constructor(idIn: number, titleIn: string, descriptionIn: string, imageIn: string, completedIn: boolean) {
    this.id = idIn
    this.title = titleIn
    this.description = descriptionIn
    this.image = imageIn
    this.completed = completedIn
  }
}