export default class LocalStorageService {
  constructor() {

  }

  static saveToLocalStorage(name: string, data: string) : void {
    localStorage.setItem(name, data);
  }

  static loadFromLocalStorage(name: string) : string {
    return localStorage.getItem(name);
  }

  static removeFromLocalStorage(name: string) : void {
    localStorage.removeItem(name);
  }

}