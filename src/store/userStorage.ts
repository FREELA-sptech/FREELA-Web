export class UserStorage {
  private static readonly isFreelancerKey: string = "IS_FREELANCER"
  private static readonly tokenUserKey: string = "TOKEN_USER"

  public static setIsFreelancerLocalStorage(mode: boolean) {
    localStorage.setItem(this.isFreelancerKey, JSON.stringify(mode))
  }

  public static getIsFreelancerLocalStorage() {
    return JSON.parse(localStorage.getItem(this.isFreelancerKey)!)
  }

  public static removeIsFreelancerLocalStorage() {
    localStorage.removeItem(this.isFreelancerKey)
  }

  public static setTokenUserLocalStorage(token: string) {
    localStorage.setItem(this.tokenUserKey, token)
  }

  public static getTokenUserLocalStorage() {
    return localStorage.getItem(this.tokenUserKey)
  }

  public static removeTokenUserLocalStorage() {
    localStorage.removeItem(this.tokenUserKey)
  }

  public static clearAllLocalStorage() {
    this.removeIsFreelancerLocalStorage()
    this.removeTokenUserLocalStorage()
  }

  public static isAuthenticated() {
    return this.getTokenUserLocalStorage() ? true : false
  }
}
