export class UserStorage {
  private static readonly isFreelancerKey: string = "IS_FREELANCER"
  private static readonly tokenUserKey: string = "TOKEN_USER"
  private static readonly idUserKey: string = "ID_USER"
  private static readonly userProfile: string = "USER_PHOTO_PROFILE"

  public static setIsFreelancerLocalStorage(mode: boolean) {
    localStorage.setItem(this.isFreelancerKey, JSON.stringify(mode))
  }

  public static getIsFreelancerLocalStorage() {
    if (localStorage.getItem(this.isFreelancerKey)) {
      return JSON.parse(localStorage.getItem(this.isFreelancerKey)!)
    }
    return false
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

  public static setPhotoUserLocalStorage(photo: string) {
    localStorage.setItem(this.userProfile, photo)
  }

  public static getPhotoUserLocalStorage() {
    return localStorage.getItem(this.userProfile)
  }

  public static removePhotoUserLocalStorage() {
    localStorage.removeItem(this.userProfile)
  }

  public static setIdUserLocalStorage(id: number) {
    localStorage.setItem(this.idUserKey, JSON.stringify(id))
  }

  public static getIdUserLocalStorage() {
    return Number(localStorage.getItem(this.idUserKey))
  }

  public static removeIdUserLocalStorage() {
    localStorage.removeItem(this.idUserKey)
  }

  public static clearAllLocalStorage() {
    this.removeIsFreelancerLocalStorage()
    this.removeTokenUserLocalStorage()
    this.removeIdUserLocalStorage()
    this.removePhotoUserLocalStorage()
  }

  public static isAuthenticated() {
    return this.getTokenUserLocalStorage() ? true : false
  }


}
