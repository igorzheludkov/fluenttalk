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
