const getResponse = (res: Response) => {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

interface AddItemData {
  name: string;
  link: string;
}

interface UserInfo {
  name: string;
  about: string;
}

interface AvatarData {
  avatar: string;
}

class Api {
  private _address: string;
  private _token?: string;

  constructor(address: string) {
    this._address = address;
  }

  setToken(token: string) {
    this._token = token;
  }

  addItem({ name, link }: AddItemData) {
    return fetch(`${this._address}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({ name, link }),
    }).then(getResponse);
  }

  removeItem(itemId: string) {
    return fetch(`${this._address}/items/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    }).then(getResponse);
  }

  setUserInfo({ name, about }: UserInfo) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({ name, about }),
    }).then(getResponse);
  }

  setUserAvatar({ avatar }: AvatarData) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this._token}`,
      },
      body: JSON.stringify({ avatar }),
    }).then(getResponse);
  }

  changeLikeItemStatus(itemId: string, like: boolean) {
    return fetch(`${this._address}/items/${itemId}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: {
        Authorization: `Bearer ${this._token}`,
      },
    }).then(getResponse);
  }

  register(email: string, password: string) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(getResponse);
  }

  login(email: string, password: string) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(getResponse);
  }

  checkToken(token: string) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(getResponse);
  }

  getAppInfo() {
    return Promise.all([this.getItemList(), this.getUserInfo()]);
  }

  getItemList() {
    return fetch(`${this._address}/items`, {
      headers: { Authorization: `Bearer ${this._token}` },
    }).then(getResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: { Authorization: `Bearer ${this._token}` },
    }).then(getResponse);
  }
}

export default new Api(process.env.REACT_APP_API_URL || "");
