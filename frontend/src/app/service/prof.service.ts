import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Prof } from '../model/prof';

export const httpOptions = {
    headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: ""
    })
};

@Injectable({
    providedIn: "root"
})

export class ProfService {
    private profUrl: string = "http://localhost:3000/profs";

    constructor() { }



}

