export type TMainTabs = {
  DayStack: undefined
  DialogStack: undefined
  BookmarksStack: undefined
  RatingStack: undefined
  ProfileStack: undefined
}

export type TRootNavigator = {
  MainTabs: TMainTabs
  AuthStack: TAuthStack
}

export type TAuthStack = {
  LoginSignUp: undefined
}

// Navigation params - only serializable data
export type TSubCategoryParams = {
  id: string
  name: string
  description: string
}

export type TDialogItemParams = {
  id: string
  title: string
  description: string
}

export type TDialogStack = {
  Dialogs: undefined
  Subcategory: {
    subCategory: TSubCategoryParams
  }
  Talk: {
    dialogItemId: string
    title: string
  }
}
