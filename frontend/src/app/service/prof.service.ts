import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Prof } from "../model/prof";
import { AuthService } from "./auth.service";

export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "",
  }),
};

@Injectable({
  providedIn: "root",
})
export class ProfService {
  private profUrl = "http://localhost:3000/profs";

  constructor(private http: HttpClient, private authService: AuthService) {}

  getProfs(): Promise<Prof[]> {
    return this.http.get<Prof[]>(`${this.profUrl}`, httpOptions).toPromise();
  }

  getSingleProf(prof: Prof): Promise<Prof> {
    return this.http
      .get<Prof>(`${this.profUrl}/${prof.id}`, httpOptions)
      .toPromise();
  }

  deleteProf(prof: Prof): Promise<Prof> {
    return this.http
      .delete<Prof>(`${this.profUrl}/${prof.id}`, httpOptions)
      .toPromise();
  }

  insertProf(name: string, rate: number): Promise<Prof> {
    return this.http
      .post<Prof>(`${this.profUrl}`, { name, rate }, httpOptions)
      .toPromise();
  }

  modifyProf(id: string, name: string, rate: number): Promise<Prof> {
    return this.http
      .patch<Prof>(`${this.profUrl}/${id}`, { name, rate }, httpOptions)
      .toPromise();
  }

  getProfRating(prof: Prof): Promise<number[]> {
    return this.http
      .get<number[]>(`${this.profUrl}/${prof.id}/rating`, httpOptions)
      .toPromise();
  }

  getProfComments(prof: Prof): Promise<string[]> {
    return this.http
      .get<string[]>(`${this.profUrl}/${prof.id}/comments`, httpOptions)
      .toPromise();
  }

  addNewCommentToProf(prof: Prof, comment: string): Promise<Prof> {
    return this.http
      .patch<Prof>(
        `${this.profUrl}/${prof.id}/comments`,
        { comment },
        httpOptions
      )
      .toPromise();
  }

  rateProf(
    prof: Prof,
    helpfulness: number,
    preparedness: number,
    diction: number
  ) {
    return this.http
      .patch<Prof>(
        `${this.profUrl}/${prof.id}/rating`,
        { helpfulness, preparedness, diction },
        httpOptions
      )
      .toPromise();
  }
}
