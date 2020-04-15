export class GlobalVariables {
  public static loggedUser: string = '';

  get staticLoggedUser() {
    return GlobalVariables.loggedUser;
  }
}
