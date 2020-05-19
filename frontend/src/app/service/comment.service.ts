import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Comment } from "../model/comment";
export const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "",
  }),
};
@Injectable({
  providedIn: "root",
})
export class CommentService {
  private commentUrl = "http://localhost:3000/comments";

  constructor(private http: HttpClient, private authService: AuthService) {}

  getComments(): Promise<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.commentUrl}`, httpOptions)
      .toPromise();
  }

  addComment(author: string, content: string): Promise<Comment> {
    return this.http
      .post<Comment>(`${this.commentUrl}`, { author, content }, httpOptions)
      .toPromise();
  }

  likeComment(commentId: string): Promise<Comment> {
    return this.http
      .patch<Comment>(`${this.commentUrl}/${commentId}/like`, httpOptions)
      .toPromise();
  }
}
