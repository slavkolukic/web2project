export class GlobalVariables {
  public static loggedUser: string = 'unsigned';

  static GetLoggedUser(): string {
    return GlobalVariables.loggedUser;
  }
}
