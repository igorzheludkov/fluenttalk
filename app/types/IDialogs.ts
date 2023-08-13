export interface IDialogCategory {
  id: number
  title: string
  imageSource?: string
  description: string
  data: IDialogCard[]
}

export interface IDialogCard {
  id: number
  title: string
  description: string
  imageSource?: string
}