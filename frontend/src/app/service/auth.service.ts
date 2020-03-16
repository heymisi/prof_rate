import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: ""
  })
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
}
