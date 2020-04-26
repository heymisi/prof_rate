import { Subject } from "./../model/subject";
import { Injectable } from "@angular/core";
import { AuthService, httpOptions } from "./auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SubjectService {
  private subjectUrl = "http://localhost:3000/subjects";

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSubjects(): Promise<Subject[]> {
    return this.http
      .get<Subject[]>(`${this.subjectUrl}`, httpOptions)
      .toPromise();
  }
}
