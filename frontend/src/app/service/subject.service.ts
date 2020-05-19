import { Subject } from "./../model/subject";
import { Injectable } from "@angular/core";
import { AuthService, httpOptions } from "./auth.service";
import { HttpClient } from "@angular/common/http";
import { Comment } from "../model/comment";

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

  getSingleSubject(subj: Subject): Promise<Subject> {
    return this.http
      .get<Subject>(`${this.subjectUrl}/${subj.id}`, httpOptions)
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

  getSubjectRating(subj: Subject): Promise<number[]> {
    return this.http
      .get<number[]>(`${this.subjectUrl}/${subj.id}/rating`, httpOptions)
      .toPromise();
  }

  getSubjectComments(subj: Subject): Promise<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.subjectUrl}/${subj.id}/comments`, httpOptions)
      .toPromise();
  }

  addNewComment(subj: Subject, comment: string): Promise<Subject> {
    return this.http
      .patch<Subject>(
        `${this.subjectUrl}/${subj.id}/comments`,
        { comment },
        httpOptions
      )
      .toPromise();
  }

  rateSubject(
    subj: Subject,
    difficulty: number,
    usefulness: number,
    curiosity: number
  ) {
    return this.http
      .patch<Subject>(
        `${this.subjectUrl}/${subj.id}/rating`,
        { difficulty, usefulness, curiosity },
        httpOptions
      )
      .toPromise();
  }
}
