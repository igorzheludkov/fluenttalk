import { IDialogCategory } from '@/types/IDialogs'

export const dialogCategories: IDialogCategory[] = [
  {
    id: 1,
    title: 'Everyday Life',
    imageSource: 'https://picsum.photos/seed/0/300/300',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi ut aliquet tristique, nisl nisl egestas nunc, eget ultricies nunc nibh ut nisi. Sed auctor, nisi ut',
    data: [
      {
        id: 1,
        title: 'Greetings',
        imageSource: 'https://picsum.photos/seed/1/300/300',
        description: 'Sample description'
      },
      {
        id: 2,
        title: 'Ice Breakers - Start a talk',
        imageSource: 'https://picsum.photos/seed/2/300/300',
        description: 'Sample description'
      },
      {
        id: 3,
        title: 'Shopping',
        imageSource: 'https://picsum.photos/seed/3/300/300',
        description: 'Sample description'
      },
      {
        id: 4,
        title: 'Card 4',
        imageSource: 'https://picsum.photos/seed/4/300/300',
        description: 'Sample description'
      },
      {
        id: 5,
        title: 'Card 4',
        description: 'Sample description'
        // No image source for this card
      }
    ]
  },
  {
    id: 2,
    title: 'On the work',
    imageSource: 'https://picsum.photos/seed/0/300/300',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi ut aliquet tristique, nisl nisl egestas nunc, eget ultricies nunc nibh ut nisi. Sed auctor, nisi ut',
    data: [
      {
        id: 1,
        title: 'Card 1',
        imageSource: 'https://picsum.photos/seed/1/300/300',
        description: 'Sample description'
      },
      {
        id: 2,
        title: 'Card 2',
        imageSource: 'https://picsum.photos/seed/2/300/300',
        description: 'Sample description'
      },
      {
        id: 3,
        title: 'Card 3',
        imageSource: 'https://picsum.photos/seed/3/300/300',
        description: 'Sample description'
      },
      {
        id: 4,
        title: 'Card 4',
        imageSource: 'https://picsum.photos/seed/4/300/300',
        description: 'Sample description'
      },
      {
        id: 5,
        title: 'Card 4',
        description: 'Sample description'
        // No image source for this card
      }
    ]
  }
]
