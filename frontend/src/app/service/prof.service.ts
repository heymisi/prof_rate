import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Prof } from '../model/prof';
import { AuthService } from './auth.service';

export const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: ''
    })
};

@Injectable({
    providedIn: 'root'
})

export class ProfService {
    private profUrl = 'http://localhost:3000/profs';

    constructor(private http: HttpClient,
        private authService: AuthService,) { }

        getProfs(): Promise<Prof[]> {
            return this.http.get<Prof[]>(`${this.profUrl}`, httpOptions).toPromise();
          }

}

