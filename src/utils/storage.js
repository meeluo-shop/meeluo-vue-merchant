import { tokenTableName } from "@/config/settings";

export class Storage {
  static get(key, defaultValue) {
    let value = window.localStorage.getItem(key);
    try {
      value = JSON.parse(value);
    } catch (err) {}
    return value === undefined ? defaultValue : value;
  }

  static set(key, value) {
    if (value && typeof value === "object") {
      value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
  }

  static clear(key) {
    window.localStorage.removeItem(key);
  }
}

export class LoginStore {
  static storageKey = "login";

  static get() {
    return Storage.get(this.storageKey, {});
  }

  static set(data) {
    Storage.set(this.storageKey, data);
  }

  static clear() {
    Storage.clear(this.storageKey);
  }
}

export class TokenStore {
  static storageKey = tokenTableName;

  static get() {
    return Storage.get(this.storageKey, []);
  }

  static set(token) {
    Storage.set(this.storageKey, token);
  }

  static clear() {
    Storage.clear(this.storageKey);
  }
}

export class UserStore {
  static storageKey = "user";

  static get() {
    return Storage.get(this.storageKey);
  }

  static set(user) {
    Storage.set(this.storageKey, user);
  }
}

export class MerchantStore {
  static storageKey = "merchant";

  static get() {
    return Storage.get(this.storageKey);
  }

  static set(merchant) {
    Storage.set(this.storageKey, merchant);
  }
}

export class RegionStore {
  static storageKey = "regions";

  static get(code) {
    return Storage.get(this.storageKey + "/" + code);
  }

  static set(code, data) {
    Storage.set(this.storageKey + "/" + code, data);
  }
}
