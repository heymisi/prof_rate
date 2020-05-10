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

  deleteSubject(subj: Subject): Promise<Subject> {
    return this.http
      .delete<Subject>(`${this.subjectUrl}/${subj.id}`, httpOptions)
      .toPromise();
  }

  insertSubject(name: string, rate: number): Promise<Subject> {
    return this.http
      .post<Subject>(`${this.subjectUrl}`, { name, rate }, httpOptions)
      .toPromise();
  }

  modifySubject(id: string, name: string, rate: number): Promise<Subject> {
    return this.http
      .patch<Subject>(`${this.subjectUrl}/${id}`, { name, rate }, httpOptions)
      .toPromise();
  }
}
