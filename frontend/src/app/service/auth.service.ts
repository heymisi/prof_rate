import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "../model/user";

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "",
  }),
};

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public isLoggedIn = false;
  public user: User;
  public redirectUrl: string;
  private authUrl = "http://localhost:3000/user";

  constructor(private http: HttpClient) {}

  async register(
    username: string,
    password: string,
    name: string,
    email: string,
    image: string
  ) {
    try {
      const user = await this.http
        .post<User>(
          `${this.authUrl}/register`,
          { username, password, name, email, image },
          httpOptions
        )
        .toPromise();
      this.user = user;
      return Promise.resolve(this.user);
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  async login(username: string, password: string): Promise<User> {
    console.log(username);
    try {
      const token = btoa(`${username}:${password}`);
      httpOptions.headers = httpOptions.headers.set(
        "Authorization",
        `Basic ${token}`
      );
      const user = await this.http
        .post<User>(
          `${this.authUrl}/login`,
          { username, password },
          httpOptions
        )
        .toPromise();
      this.isLoggedIn = true;
      this.user = user;
      return Promise.resolve(this.user);
    } catch (e) {
      console.log(e);
      return Promise.reject();
    }
  }

  logout() {
    httpOptions.headers = httpOptions.headers.set("Authorization", ``);
    this.isLoggedIn = false;
    this.user = null;
  }
}
