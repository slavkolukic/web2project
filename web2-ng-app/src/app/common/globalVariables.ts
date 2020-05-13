export class GlobalVariables {
  public static loggedUser: boolean = false;

  static GetLoggedUser(): boolean {
    return GlobalVariables.loggedUser;
  }
}
